const attendence = require("../model/attendence.model")
const employee = require("../model/employee.model")

const defaultattendence = async (req, res, next) => {
    const employees = await employee.find({})
    const date = new Date().toISOString().split('T')[0]
    try {
        const exist = await attendence.findOne({ date })
        if (!exist) {
            const attendences = employees.map(emp => 
                (
                    { date: date,
                     employeeId: emp._id,
                     status: null }
                )
             )
             const result = await attendence.insertMany(attendences)
        }
        
        // console.log(result)
        // res.status(200).json({ message: "Attendence Marked" })

        next()
    } catch (error) {
        res.status(500).json({ msg: "msg from defaultattendence", message: error.message })
    }
}

module.exports = defaultattendence;
