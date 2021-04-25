const loopDays = (inDay, outDay) => {
    const days = [];
    const lastDay = new Date(outDay);
    for(let d = new Date(inDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        const day = d.toUTCString();
        days.push(day);
    }
    return days;
}

module.exports = loopDays;
