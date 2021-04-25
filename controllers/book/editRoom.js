const { verifyNewSchedule } = require('./common/');
const { editSchedule } = require('../schedulesDB/');

const editRoom = async ({checkIn, checkOut }, id) => {
    let status;
    let message;
    let args;

    const { info, data, days } = await verifyNewSchedule(checkIn, checkOut, id);

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
            const editResponse = await editSchedule(id, checkIn, checkOut, days);
            if (editResponse.nModified > 0) {
                    status = 200;
                    message = 'Reservation modified';
                    args = {
                        checkIn,
                        checkOut
                    };
            } else {
                status = 404;
                message = 'No Reservation found';
            };
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

module.exports = editRoom;
