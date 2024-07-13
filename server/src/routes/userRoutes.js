const express = require('express');
const router = express.Router();
const multer = require('multer');
const userAuthController = require('../controllers/userAuthController');
const userControlller = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const otpController = require('../controllers/otpController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/controllers/uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    }
  });
  
  const upload = multer({ storage: storage });



//auth routes
router.post('/register', userAuthController.register);
router.post('/send-email',otpController.sendOTP);
router.post('/verify-email',otpController.verifyOTP);
router.post('/login', userAuthController.login);
router.get('/logout', userAuthController.logout);

//routes for user action
router.post('/product/add', upload.single('profilePicture'), userControlller.addProduct);
router.get('/user/:id',userControlller.getUser);
router.put('/updateuser/:id',userControlller.updateUser);
router.delete('/removeItem/:id', authMiddleware, userControlller.removeItem);
router.put('/updateItem/:id', userControlller.updateItem);
router.get('/getItem/:id', userControlller.getItem);

module.exports = router;