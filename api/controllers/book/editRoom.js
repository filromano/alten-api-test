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
            const { ok, nModified } = editResponse.data;
            status = editResponse.status;
            if (status === 200) {
                if (ok > 0 && nModified > 0) {
                    message = 'Reservation modified';
                    args = {
                        checkIn,
                        checkOut
                    };
                } else if (nModified === 0 && ok > 0) {
                        message = 'Reservation kept the same value';
                        args = {
                            checkIn,
                            checkOut
                        };
                }
            } else if (status === 400) {
                status = editResponse.status
                message = editResponse.message
            } else {
                message = 'No Reservation found';
            }
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
