
const employees= require("../model/employee.model")
const attendence = require("../model/attendence.model")
const { Types } = require("mongoose");
const Admin = require("../model/admin.model");

//getting all employees data
const getEmployeedata= async(req,res)=>{
    try {
        const employee_data= await employees.find()
        res.status(200).json(employee_data)

    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' })
    }
}

//insert new data 
const newEmployee = async (req, res) => {
    try {
        const {joiningDate,_id, name, role, email, phone, department, status } = req.body;
        const newemployee = new employees({joiningDate,_id, name, role, email, phone, department, status, });
        const savedEmployee = await newemployee.save();
        if (!savedEmployee) {
            res.status(400).json({ message: 'Error creating employee' });
        } else {
            res.json({ employee: savedEmployee });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//updating data and leaves
const updateEmployee = async (req, res) => {
    try {
        const {_id}= req.params
        const {joiningDate, name, role, email, phone, department, status,tasks, leaves } = req.body;
        const updatedEmployee = await employees.findByIdAndUpdate(_id , {joiningDate,_id, name, role, email, phone, department, status,tasks, leaves }, { new: true });
        if (!updatedEmployee) {
            res.status(400).json({ message: 'Error updating employee' });
        } else {
            res.json({ employee: updatedEmployee });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//delete leave
const deleteLeave = async (req, res) => {
    console.log("deleteLeave",req.body)
    try {
        const formattedEmployeeData = req.body;
        const updatedEmployee = await employees.findByIdAndUpdate(formattedEmployeeData._id, formattedEmployeeData, { new: true });
        if (!updatedEmployee) {
            res.status(400).json({ message: 'Error deleting leave' });
        } else {
            res.json({ employee: updatedEmployee });
        }
    }
        catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//delete employee
const deleteEmployee = async (req, res) => {
    try {
        const {_id} = req.params
        const deletedEmployee = await employees.findByIdAndDelete(_id);
        if (!deletedEmployee) {
            res.status(400).json({ message: 'Error deleting employee' });
        } else {
            res.json({ message: 'Employee deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addLeaveToEmployee = async (req,res) => {
   
    try {
        const id = req.params?._id;
        const {description,email,startDate,endDate ,status,daysCount,type,name} = req.body;
        if (!id) {
          throw new Error("Employee ID is required");
        }
        if (!description || !email || !startDate || !endDate || !status || !daysCount || !type) {
          throw new Error("All fields are required");
        }
        const leaveData = {description,email,startDate,endDate ,status,daysCount,type,name};
      const employee = await employees.findById(id)
      if (!employee) {
        throw new Error("Employee not found");
      }
  
      // Add the leave to the employee's leaves array
      employee.leaves.push(leaveData);
  
      // Save the updated employee document
      await employee.save();
  
      return res.json({ success: true, message: "Leave added successfully", employee });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

const getLoginEmployee = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await Admin.findById(userId) || await  employees.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "success",
            userdata: user  
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get employee-attendance
const displayEmployeeAttendance = async (req, res) => {
    try {
      const { employeeId } = req.params; //  employeeId is passed as a route parameter
  
     
      if (!employeeId) {
        return res.status(400).json({ message: "Employee ID is required." });
      }
  
      // Fetch attendance using $match 
      const attendanceRecords = await attendence.aggregate([
        {
          $match: {
            employeeId: new Types.ObjectId(employeeId), // Match attendance records for the given employee ID
          },
        },
        {
          $sort: { date: -1 }, 
        },
      ]);
  
      // Return the attendance records
      if (attendanceRecords.length === 0) {
        return res.status(404).json({ message: "No attendance records found." });
      }
  
      res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };



module.exports= {getEmployeedata, newEmployee, updateEmployee, deleteEmployee, getLoginEmployee,
    addLeaveToEmployee, displayEmployeeAttendance, deleteLeave}