const Users  = require('../models/userModel');

const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, email, password, emailVerified, ...others } = req.body;

    //if email is not verified
    if(!emailVerified){
      return res.status(400).json({ message: 'Email is not verified'});
    }

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

exports.emailVerifier = (req, res) => {
  const email = req.body;

}


// Logout route
exports.logout = (req, res) => {
    // Destroy session
    req.session.destroy();
    res.json({ message: 'Logout successful' });
};