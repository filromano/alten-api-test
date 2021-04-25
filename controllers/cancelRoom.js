const { cancelSchedule } = require('./schedules');

const cancelRoom = async (id) => {
    const response = await cancelSchedule(id);
    if (response.deleteCount > 0) {
        return {
            status: 200,
            message: 'Reservation canceled'
        }
    } else {
        return {
            status: 400,
            message: 'No Reservation found'
        }
    }
}

module.exports = { cancelRoom }