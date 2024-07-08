const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');
const userControlller = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

//auth routes
router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);
router.post('/logout', userAuthController.logout);

//routes for user action
router.post('/addItem', authMiddleware, userControlller.addItem);
router.delete('/removeItem/:id', authMiddleware, userControlller.removeItem);
router.put('/updateItem/:id', authMiddleware, userControlller.updateItem);
router.get('/getItem/:id', authMiddleware, userControlller.getItem);

module.exports = router;