const express = require('express');

const router = express.Router();

const taskcontroller = require('./controllers/taskcontroller');
const taskMiddleware = require('./middlewares/taskMiddleware');

router.get('/task', taskcontroller.getAll);
router.post('/task', taskMiddleware.validateFieldTitle, taskcontroller.createTask);
router.delete('/task/:id', taskcontroller.deleteTask);
router.put('/task/:id',
    taskMiddleware.validateFieldTitle,
    taskMiddleware.validateFieldStatus,
    taskcontroller.updateTask);

module.exports = router;