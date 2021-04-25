const loopDays = require('./loopDays');
const { getScheduled } = require('../../schedulesDB/');

const checkAvailability = async (id) => {
    const data = await getScheduled(id);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const nextDays = [];
    const scheduledDays = [];

    // get the next 30 days
    for(var i=1; i<=30; i++){
        let day = new Date(Date.UTC(year, month, date + i, 0, 0, 0, 0));
        const stringDay = day.toUTCString();
        nextDays.push(stringDay);
    }

    // get dates already scheduled
    data.map(item => {
        const days = loopDays(item.checkIn, item.checkOut);
        scheduledDays.push(...days);
    })

    //filter available days
    let availableDays = nextDays.filter(item => !scheduledDays.includes(item));

    availableDays = availableDays.map(item => new Date(item));

    return availableDays;
};

const verifyNewSchedule = async (checkIn, checkOut, id) => {
    let response;
    const availableDays = await checkAvailability(id);

    // get all days between in and out
    const scheduleDays = await loopDays(checkIn, checkOut);

    const days = scheduleDays.length;

    //change it to string to compare
    const availableDaysString = availableDays.map((item) => item.toUTCString());
    const isAvailableDays = availableDaysString.filter(item => scheduleDays.includes(item));

    //validate date
    if(checkIn > checkOut) {
        response = {
            info: 'checkInBigger',
            data: []
        }
    } else if (scheduleDays.length > isAvailableDays.length) {
        const notAvailableDays = scheduleDays.filter((item) => !isAvailableDays.includes(item));
        response = {
            info: 'notAvailable',
            data: notAvailableDays,
            days
        };
    } else {
        response = {
            info: 'success',
            data: [],
            days
        };
    };

    return response;
};

module.exports = {
    checkAvailability,
    verifyNewSchedule
};

