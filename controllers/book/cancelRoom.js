const { cancelSchedule } = require('../schedulesDB/');

const cancelRoom = async (id) => {
    const response = await cancelSchedule(id);
    console.log(response)
    if (response.deletedCount > 0) {
        return {
            status: 200,
            message: 'Reservation canceled'
        };
    } else {
        return {
            status: 400,
            message: 'No Reservation found'
        }
    };
};

module.exports = cancelRoom;
