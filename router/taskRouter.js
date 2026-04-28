const express = require('express');
const { getTasks, createTask, deleteTask, updateTask } = require('../controller/taskController');


const router = express.Router();

router.get('/getTasks', getTasks);
router.post('/createtask', createTask);
router.put('/updatetask/:id', updateTask);
router.delete('/deletetask/:id', deleteTask);

module.exports = router;