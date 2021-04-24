const scheduleSchema = require('../Schema/Hotel');
const mongoose = require('mongoose')


const getScheduled = async () => {
    const scheduleModel = mongoose.model('schedule', scheduleSchema)
    const schedules = await scheduleModel.find((err, schedule) => {
        return schedule
    })
    return schedules;
}


module.exports = { getScheduled };