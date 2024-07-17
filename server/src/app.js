const express = require('express');
const http = require('http');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const session = require('express-session');
const sequelize = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/ProductModel');
const Transaction = require('./models/TransactionModel');
const cors = require('cors');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// This object will store user IDs mapped to WebSocket connections
const clients = new Map();

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

//handel webSockets
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  ws.send('connected');
});


app.get('/',(req,res)=>{
  res.send("We are Live");
})

app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/transactions', transactionRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

// // Handle WebSockets
// wss.on('connection', (ws, req) => {
//   // Assuming userID is sent as a query parameter
//   const userID = new URL(req.url, `http://${req.headers.host}`).searchParams.get('userID');
//   if (userID) {
//       clients.set(userID, ws);
//       ws.on('close', () => {
//           clients.delete(userID);
//       });
//   }
// });

// server.listen(config.port, () => {
//     console.log(`Server running on port ${config.port}`);
// });

// module.exports = { clients };