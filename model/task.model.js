const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new mongoose.Schema({
  
  userid:{ type: String, required: true },
  email:{ type: String, required: true },
  title: { type: String, required: true },
  active: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  category: { type: String },
  completed: { type: Boolean, default: false },
  department: { type: String, required: false },
  description: { type: String, required: true }
  
},{
    timestamps: true
});

const Tasks = model('Tasks', taskSchema);
module.exports= Tasks