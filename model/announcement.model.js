const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the announcement
  content: { type: String, required: true }, // Detailed content of the announcement
  date: { type: Date, default: Date.now }, // Date of announcement
  createdBy: { type: String, default:null }, // Name or ID of the admin who created it
});

module.exports = mongoose.model("Announcement", announcementSchema);
