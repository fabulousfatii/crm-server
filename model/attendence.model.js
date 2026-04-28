const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const attendenceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    employeeId:{type: Schema.Types.ObjectId, ref: 'employees', required: true},
    status: { type: String, enum: ['Present', 'Absent'], default:null},
});
const attendence = model('attendence', attendenceSchema);
module.exports= attendence
