const notificationModel = require("../model/notification.model");
const employeeSchema = require("../model/employee.model");

const getNotificationData = async (req, res) => {
    try {
        const notificationData = await notificationModel.find().populate("employeeId");
        res.json(notificationData);
        } catch (error) {
            res.status(500).json({ message: "Error fetching notification data" });
            }
            }

const getNotification= async(req,res)=>{
    try {
        const {employeeId}= req.params
        const notificationData = await notificationModel.find({employeeId}).populate("employeeId");
        res.json(notificationData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notification data" });
    }
}          

const createNotification = async (req, res) => {
    try {
        const { employeeId, title, content } = req.body;
        const notification = new notificationModel({ employeeId, title, content });
        const savedNotification = await notification.save();
        if (!savedNotification) {
            res.status(400).json({ message: "Error creating notification" });
        } else {
            res.json({ notification: savedNotification });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const departmentNotification = async (req, res) => {
    const { department } = req.params;
    try {
        const employeeData = await employeeSchema.find({ department });
        const employeeIds = employeeData.map((employee) => employee._id);
        const notificationData =  employeeIds.map(async (employeeId) => {
            employeeId,
             title,
             content
        })

        const savedNotification= await notificationsModel.insertMany(notificationData);
        if (!savedNotification) {
            res.status(400).json({ message: "Error creating notification" });
        } else {
            res.json({ notification: savedNotification });
        }
        res.json(notificationData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notification data" });
    }
}

module.exports = { getNotificationData, createNotification, getNotification, departmentNotification };
