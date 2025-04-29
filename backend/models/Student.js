const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: 'studentId must be alphanumeric',
    },
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  dob: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  enrollmentYear: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
