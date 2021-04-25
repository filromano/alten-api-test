const scheduleSchema = require('../../Schema/Hotel');
const mongoose = require('mongoose');

const scheduleModel = mongoose.model('schedule', scheduleSchema);

const getScheduled = async (id) => {
    try {
        const schedules = await scheduleModel.find({id: {$ne: id}});
        return schedules;
    }
    catch(err) {
        return err;
    }
}

const insertSchedule = async (checkIn, checkOut, days) => {
    try {
        const dates = new scheduleModel({checkIn, checkOut, days});
        const saveUser = await dates.save();
        return {
            status: 201,
            message: saveUser
        };
    }
    catch(err) {
        return {
            status: 400,
            message: err.errors.days.properties.message
        };
    }
}

const cancelSchedule = async (id) => {
    try {
        const remove = await scheduleModel.deleteOne({id});
        return remove;
    }
    catch(err) {
        return err;
    }
}

const editSchedule = async (id, checkIn, checkOut, days) => {
    try {
        const edit = await scheduleModel.updateOne({ id }, { checkIn, checkOut, days });
        return edit;
    }
    catch(err) {
        return err;
    }
}


module.exports = {
    getScheduled,
    insertSchedule,
    cancelSchedule,
    editSchedule
};
