const express=require('express');
const {  getNotification, createNotification, departmentNotification } = require('../controller/notificationController');
const router = express.Router();

router.get('/',getNotification);
router.post('/createNotification',createNotification);  
router.post('/:department',departmentNotification);

module.exports = router;