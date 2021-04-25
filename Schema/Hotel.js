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
  },
  days: {
    type: Number,
    required: true,
    max: 3
  }
});

module.exports = scheduleSchema;