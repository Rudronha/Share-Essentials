const nodemailer = require('nodemailer');
const config  = require('./config');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider here
    auth: {
        user: config.my_email, // Replace with your email address
        pass: config.my_email_password // Replace with your email password or app password
    }
});

module.exports = transporter;