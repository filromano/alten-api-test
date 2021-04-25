const checkAvailability = require('./availableDays');
const bookRoom = require('./bookRoom');
const cancelRoom = require('./cancelRoom');
const editRoom = require('./editRoom');

module.exports = {
    checkAvailability,
    bookRoom,
    cancelRoom,
    editRoom
};
