const mongoose = require('mongoose')
const { Schema } = mongoose
const uuid = require('uuid');

const scheduleSchema = new Schema({
    id: {
        type: String,
        default: uuid.v4
    },
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