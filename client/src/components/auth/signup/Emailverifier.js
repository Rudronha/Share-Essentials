const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Function to generate random OTP
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    return otp.toString();
}

// Function to send OTP via email
async function sendOTP(email) {
    // Generate OTP
    const otp = generateOTP();

    // Email configuration
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider here
        auth: {
            user: 'rudronha@gmail.com', // Replace with your email address
            pass: 'ohyv xbtk eipa ztux' // Replace with your email password or app password
        }
    });

    // Email content
    let mailOptions = {
        from: 'rudronha@gmail.com', // Replace with your email address
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('OTP sent: ' + info.response);
        return otp; // Return the OTP for verification
    } catch (error) {
        console.error('Error sending email: ' + error);
        return null;
    }
}

// Example usage:
let recipientEmail = 'triratanajyoti@gmail.com'; // Replace with recipient's email address
sendOTP(recipientEmail)
    .then(otp => {
        if (otp) {
            console.log(`OTP sent to ${recipientEmail}.`);
        } else {
            console.log('Failed to send OTP.');
        }
    })
    .catch(err => console.error('Error:', err));
