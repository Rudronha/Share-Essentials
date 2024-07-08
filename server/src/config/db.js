const config  = require('./config');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  logging: false
});
const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDB();

module.exports = sequelize;

