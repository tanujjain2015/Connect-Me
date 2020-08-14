const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  feedback: {
    type: String,
    //required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
  }
},
{
  toJSON: {
    getters: true
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;