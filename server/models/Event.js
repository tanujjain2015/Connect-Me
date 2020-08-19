const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./User');
const Schedule = require('./Schedule');

const eventSchema = new Schema({
  month: {
    type: String,
    required: true,
  },
  startime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
    unique: true,
  },
  slot: {
    type: String,
    required: true,
    minlength: 5
  },
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;