const express = require('express');
const router = express.Router();
const {getEmployeedata,newEmployee,updateEmployee,deleteEmployee,getLoginEmployee,
       addLeaveToEmployee,displayEmployeeAttendance, deleteLeave}= require("../controller/employeeController")
const authenticateToken = require("../middleware/authuser")

// Define your routes here

router.get('/employees',getEmployeedata);
router.get('/employeedata',getLoginEmployee);
router.post('/employees',newEmployee);
router.put('/employees/:_id',updateEmployee); // also for leave update
router.post('/employees/leave/:_id',addLeaveToEmployee);
router.delete('/employees/:_id',deleteEmployee);
router.get("/attendance/:employeeId", displayEmployeeAttendance);
router.post('/employees/deleteLeave',authenticateToken,deleteLeave)


module.exports = router;