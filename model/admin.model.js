// Import Mongoose
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Create the Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin'], // Restrict the role to 'admin'
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
