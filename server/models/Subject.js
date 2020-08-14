const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema({
  subject: {
    type: String,
    required: true
    //trim: true
  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
