const Tasks = require("../model/task.model")


const getTasks= async(req,res)=>{
    try {
        const tasks= await Tasks.find()
        res.status(200).json(tasks)

    } catch (error) {   
        res.status(500).json({ message: 'Error fetching tasks' })
    }     
    }

    const createTask = async (req, res) => {
        try {
            const {userid, email, title , dueDate, category, department, description} = req.body;
            const announcement = new Tasks({ userid, email, title ,dueDate, category, department, description});
            const savedAnnouncement = await announcement.save();
            if (!savedAnnouncement) {
                res.status(400).json({ message: 'Error creating announcement' });
            } else {
                res.json({ announcement: savedAnnouncement });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }}

const updateTask = async (req, res) => {
    try {
        const taskid = req.params.id
        const {  title ,dueDate,category,email,active , completed, department, description,userid } = req.body;
        // console.log("params",req.params, req.body)
       
        const updatedTask = await Tasks.findByIdAndUpdate(taskid , {title ,email,active, dueDate,category, completed, department, description, userid}, {new: true});
        if (!updatedTask) {
            res.status(400).json({ message: 'Error updating task' });
        } else {
            res.json({ task: updatedTask });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteTask = async (req, res) => {
    try{
        const taskid = req.params.id
        const deletedTask = await Tasks.findByIdAndDelete(taskid);
        if (!deletedTask) {
            res.status(400).json({ message: 'id not found' });
        } else {
            res.json({ message: 'tasks deleted successfully' });
        }
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };