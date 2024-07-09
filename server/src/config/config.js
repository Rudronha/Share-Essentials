require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    my_email: process.env.EMAIL,
    my_email_password: process.env.EMAIL_PASSWORD
};


