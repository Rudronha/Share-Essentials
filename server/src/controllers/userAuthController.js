const Users  = require('../models/userModel');

const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, email, password, ...others } = req.body;
  
    // Check if user already exists
    const user = await Users.findOne({ where: { email: email}});
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newUser = { username, email, password: hashedPassword ,...others};
    const User = Users.create(newUser);
    await (await User).save();
    res.status(201).json({ message: 'User created successfully' });
};

  // Login route
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await Users.findOne({where: {email: email}});
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    if (await bcrypt.compare(password, user.password)) {
      // Store user data in session
      
      req.session.user = user; 
      return res.json({ userId: user.id, username: user.username , message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  };

// Logout route
exports.logout = (req, res) => {
    // Destroy session
    req.session.destroy();
    res.json({ message: 'Logout successful' });
};