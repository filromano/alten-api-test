const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost/hotel', { useNewUrlParser: true });