const transporter = require('../config/emailConfig');
const config  = require('../config/config');

let otps = {};

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    return otp.toString();
};

exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    // Generate OTP
    const otp = generateOTP();

    // Store OTP
    otps[email] = otp;

    // Email content
    const mailOptions = {
        from: config.my_email, // Replace with your email address
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('OTP sent: ' + info.response);
        res.status(200).send({ otp }); // Return the OTP for verification
    } catch (error) {
        console.error('Error sending email: ' + error);
        res.status(500).send('Failed to send OTP.');
    }
};


exports.verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    if (otps[email] && otps[email] === otp) {
        delete otps[email]; // OTP is valid, delete it
        res.status(200).send({success: true, message: 'OTP verified successfully' });
    } else {
        console.log(req.body);
        res.status(400).send({ success: false, message: 'Invalid OTP' });
    }
};


