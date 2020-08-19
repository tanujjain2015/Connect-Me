const mongoose = require('mongoose');

const { Schema } = mongoose;
const Event = require('./Event');
const User = require('./User');


const scheduleSchema = new Schema({
  month: {
    type: String,
    required: true
  },
  startime: {
    type: String,
    required: true
  },
  endtime: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;