const mongoose = require('mongoose');

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  feedback: {
    type: String,
    required: true,
    trim: true
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;