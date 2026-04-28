const express = require ("express")
const router = express.Router()
const defaultattendence = require("../middleware/defaultAttendence")
const {getAttendenceData,updateAttendence,attendenceReport} = require("../controller/attendenceController")



router.get("/get-attendence",defaultattendence,getAttendenceData)
router.put("/update/:employeeId",updateAttendence)
router.get("/report",attendenceReport)


module.exports= router