const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.post('/create-task', homeController.createTask);
router.get('/profile/:id', homeController.profile);
router.post('/update-task/:id', homeController.update);
router.get('/complete/:id', homeController.taskCompleted);
router.get('/delete-task/:id', homeController.deleteTask);
router.get('/completed-task' , homeController.showCompleted);
router.get('/delete-Completedtask/:id', homeController.deleteCompletedTask);

module.exports = router;