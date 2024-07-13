const express = require('express');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');
const session = require('express-session');
const sequelize = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/ProductModel');
const Transaction = require('./models/TransactionModel');
const cors = require('cors');
const path = require('path');

const app = express();

async function syncModels() {
    try {
      await sequelize.sync({ alter: true }); // Use alter: true to modify existing tables
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing database:',error);
    }
} 
syncModels();

// Use CORS middleware with specific origin
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true
 }));

app.use('/uploads', express.static(path.join(__dirname,'controllers', 'uploads')));

// Middleware for session management
app.use(session({
    secret: 'secret', // Change this to a strong, random secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }));

app.use(express.json());

app.get('/',(req,res)=>{
  res.send("We are Live");
})

app.use('/users',userRoutes);
app.use('/products',productRoutes);


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});