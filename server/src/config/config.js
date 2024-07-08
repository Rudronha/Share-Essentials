require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST
};


