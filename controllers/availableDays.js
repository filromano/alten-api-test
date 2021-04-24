const data = require('../db/mock.json')

const loopDays = (inDay, outDay) => {
    const days = [];
    const lastDay = new Date(outDay)
    for(let d = new Date(inDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        const day = d.toUTCString()
        days.push(day)
    }
    return days;
}

const checkAvailability = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const nextDays = [];
    const scheduledDays = [];

    // get the next 30 days
    for(var i=1; i<=30; i++){
        let day = new Date(Date.UTC(year, month, date + i, 0, 0, 0, 0));
        const stringDay = day.toUTCString()
        nextDays.push(stringDay)
    }

    // get dates already scheduled
    data.room.schedules.map(item => {
        const days = loopDays(item.checkIn, item.checkOut);
        scheduledDays.push(...days)
    })

    //filter available days
    let availableDays = nextDays.filter(item => !scheduledDays.includes(item))

    availableDays = availableDays.map(item => new Date(item))

    return availableDays;
};

module.exports = { checkAvailability }
