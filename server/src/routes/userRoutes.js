const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');
const userControlller = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const otpController = require('../controllers/otpController');

//auth routes
router.post('/register', userAuthController.register);
router.post('/send-email',otpController.sendOTP);
router.post('/verify-email',otpController.verifyOTP);
router.post('/login', userAuthController.login);
router.get('/logout', userAuthController.logout);

//routes for user action
router.get('/user/:id',userControlller.getUser);
router.post('/addItem', authMiddleware, userControlller.addItem);
router.delete('/removeItem/:id', authMiddleware, userControlller.removeItem);
router.put('/updateItem/:id', authMiddleware, userControlller.updateItem);
router.get('/getItem/:id', authMiddleware, userControlller.getItem);

module.exports = router;