// models/formModel.js

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  passportNumber: String,
  age: Number,
  address: String,
  dateOfBirth: Date,
});

module.exports = mongoose.model('Form', formSchema);
