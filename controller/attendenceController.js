const attendence = require("../model/attendence.model")
const employees = require("../model/employee.model")

const getAttendenceData = async (req, res) => {

    try {
        const date = new Date().toISOString().split('T')[0]
       const attendenceData = await attendence.find({ date: date }).populate({
    path: "employeeId",
   select: { department: 1, name: 1, employeeId: 1 }
})
        res.status(200).json(attendenceData)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }}

const updateAttendence = async (req, res) => {
    const { employeeId } = req.params
    const {  status } = req.body
    const date= new Date().toISOString().split('T')[0]
    const employee = await employees.findOne({employeeId})
    try {
        const result = await attendence.findOneAndUpdate({employeeId:employee._id, date}, { status: status }, { new: true,upsert: true })
        res.status(200).json(result)    
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }}


const attendenceReport= async(req,res)=>{
    const {date,limit=2,skip=0}=req.query
    const query={}
    
    if(date){
        query.date=date
    }
    try{
        const result=await attendence.find(query).populate({
            path: "employeeId",
            select: { department: 1, name: 1, employeeId: 1 }
        }).sort({date:-1}).limit(parseInt(limit)).skip(parseInt(skip))

        const groupdata= result.reduce((acc,curr)=>{
            if(!acc[curr.date]){
                acc[curr.date]=[]
            }
            //acc[curr.date].push(curr)
            acc[curr.date].push({name:curr.employeeId.name,
                employeeId:curr.employeeId.employeeId,
                status:curr.status || "not marked"})
            return acc
        },{})
        res.status(200).json({success:true,groupdata})
    }
    catch(error){
        res.status(500).json({message:error.message})
}    }

module.exports = { getAttendenceData, updateAttendence, attendenceReport }