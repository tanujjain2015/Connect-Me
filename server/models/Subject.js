const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema({
  subject: {
    type: String,
    required: true
    //trim: true
  },
  // user: {
  //   type: String
  // }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
