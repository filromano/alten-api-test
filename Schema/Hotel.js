const mongoose = require('mongoose')
const { Schema } = mongoose

const scheduleSchema = new Schema({
  checkIn: {
    type: String,
    required: true
  },
  checkOut: {
    type: String,
    required: true
  }
});

module.exports = scheduleSchema;