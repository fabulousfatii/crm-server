const announcementModel = require("../model/announcement.model");

const getAnnouncementData= async(req,res)=>{
    try {
        const announcement_data= await announcementModel.find()
        res.status(200).json(announcement_data)

    } catch (error) {   
        res.status(500).json({ message: 'Error fetching announcement' })
    }     
    }

const createAnnouncement = async (req, res) => {
    try {
        const {content, title,  } = req.body;
        const announcement = new announcementModel({content, title});
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

const updateAnnouncement = async (req, res) => {
    try {
        const {_id}= req.params
        const {content, title, createdBy } = req.body;
        const updatedAnnouncement = await announcementModel.findByIdAndUpdate(_id, {content, title, createdBy });
        if (!updatedAnnouncement) {
            res.status(400).json({ message: 'Error updating announcement' });
        } else {
            res.json({ announcement: updatedAnnouncement });
        }} catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteAnnouncement = async (req, res) => {
    try{
        const {_id} = req.params
        const deletedAnnouncement = await announcementModel.findByIdAndDelete(_id);
        if (!deletedAnnouncement) {
            res.status(400).json({ message: 'Error deleting announcement' });
        } else {
            res.json({ message: 'Announcement deleted successfully' });
        }
    }catch{
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAnnouncementData, createAnnouncement, updateAnnouncement, deleteAnnouncement };