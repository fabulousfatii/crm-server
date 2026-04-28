const mongoose = require('mongoose');
const { Schema, model } = mongoose;



const LeaveSchema = new mongoose.Schema({
  name: { type: String },
  daysCount: { type: Number,},
  email: {type: String,trim: true,lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  startDate: {type: Date,required: true,},
  endDate: { type: Date, required: true,},
  status: {type: String, default: "Pending",},
  type: {type: String, //enum: ["Annual Leave", "Sick Leave"], // Only two options for typerequired: true,
  },
  description: {type: String,required: true,},
  // userId: {type: Schema.Types.ObjectId,ref: 'User',required: true,}
});

const employee_schema = new mongoose.Schema({
  // _id: { type: Number, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  employeeId: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  leaves:[LeaveSchema]
},{
  timestamps: true, // Adds createdAt and updatedAt fields
});


const employees = model('employees', employee_schema);
module.exports= employees