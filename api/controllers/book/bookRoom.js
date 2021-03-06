const { verifyNewSchedule } = require('./common/');
const { insertSchedule } = require('../schedulesDB/');

const bookRoom = async ({ checkIn, checkOut }) => {
    let status;
    let message;
    let args;

    const { info, data, days } = await verifyNewSchedule(checkIn, checkOut);

    switch(info) {
        case 'notAvailable':
            status = 400;
            args = data;
            message = 'You have days that are not available';
            break;
        case 'checkInBigger':
            status = 400;
            message = 'Sorry check in date has to be before check out date';
            break;
        case 'success':
            const insertResponse = await insertSchedule(checkIn, checkOut, days);
            args = insertResponse.args;
            status = insertResponse.status;
            message = insertResponse.message;
            break;
        default:
            break;
    };

    return {
        status,
        message,
        args
    };
};

module.exports = bookRoom;
