const { loopDays } = require('../common');
const checkAvailability = require('./availableDays');
const { insertSchedule } = require('../schedulesDB/');

const bookRoom = async ({ checkIn, checkOut }) => {
    let status;
    let message;
    let args = [];
    const availableDays = await checkAvailability();

    // get all days between in and out
    const scheduleDays = loopDays(checkIn, checkOut);

    const days = scheduleDays.length;

    //change it to string to compare
    const availableDaysString = availableDays.map((item) => item.toUTCString());
    const isAvailableDays = availableDaysString.filter(item => scheduleDays.includes(item))

    //validate date
    if(checkIn > checkOut) {
        status = 400;
        message = 'Sorry check in date has to be before check out date';
    } else if (scheduleDays.length > isAvailableDays.length) {
        status = 400;
        const notAvailableDays = scheduleDays.filter((item) => !isAvailableDays.includes(item))
        args = notAvailableDays
        message = 'You have days that are not available'
    } else {
        //insert dates into db, there is also a check for max days in db
        const response = await insertSchedule(checkIn, checkOut, days)
        status = response.status;
        message = response.message;
    }

    return {
        status,
        message,
        args
    }
}

module.exports = bookRoom;
