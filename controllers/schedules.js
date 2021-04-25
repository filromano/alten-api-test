const scheduleSchema = require('../Schema/Hotel');
const mongoose = require('mongoose')


const scheduleModel = mongoose.model('schedule', scheduleSchema)

const getScheduled = async () => {
    const schedules = await scheduleModel.find((err, schedule) => {
        return schedule
    })
    return schedules;
}

const insertSchedule = async (checkIn, checkOut, days) => {
    try {
        const dates = new scheduleModel({checkIn, checkOut, days})
        const saveUser = await dates.save();
        return {
            status: 201,
            message: saveUser
        }
    }
    catch(err) {
        return {
            status: 400,
            message: err.errors.days.properties.message
        }
    }
}


module.exports = { getScheduled, insertSchedule };