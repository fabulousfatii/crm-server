const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }, // Targeted employee ID
  title: { type: String, required: true }, 
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }, 
  status: { type: String, enum: ["Unread", "Read"], default: "Unread" },
});

module.exports = mongoose.model("Notification", notificationSchema);

