const mongoose = require('mongoose');

const { Schema } = mongoose;

const offeringSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  // image: {
  //   type: String
  // },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    // required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  }
});

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;