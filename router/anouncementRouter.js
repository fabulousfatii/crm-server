const express = require('express');
const { getAnnouncementData, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controller/anouncementController');

const router = express.Router();

router.get('/getdata', getAnnouncementData);
router.post('/createAnnouncement', createAnnouncement);
router.put('/updateAnnouncement/:id', updateAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

module.exports = router;