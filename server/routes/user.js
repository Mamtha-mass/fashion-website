const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const { firstname, lastname, email, password,} = req.body;
    const UserName = `${firstname.toLowerCase()}_${Math.floor(Math.random() * 10000)}`;

    var role='user';

    if(firstname == 'mamtha2005'){
      role='admin'
    }

    const newUser = new user({ firstname, lastname, email, password,UserName,role });
    const savedUser = await newUser.save();

    // Additional response for successful user creation
    if (savedUser) {
      return res.status(201).json({ message: 'User created successfully' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Something went wrong' });
  }
});


// Sign-in route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    console.log(email, password);

    // Find the user by email
    const exsistuser = await user.findOne({ email }).exec();
    if (!exsistuser) {
      return res.status(401).json({ message: `Invalid email or password ` });
    }


    // Compare passwords (no hashing)
    if (exsistuser.password !== password) {
      return res.status(401).json({ message: `Invalid email or password ` });
    }

    if (exsistuser.password == password && exsistuser.role == 'admin') {
      return res.status(401).json({ message: `this is admin` });
      
    }

    if (exsistuser.password == password && exsistuser.role == 'user') {
      return res.status(200).json({
        message: 'Sign-in successful',
        redirectUrl: 'http://localhost:5173/Home'
      });
      
    }
    

    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Something went wrong' });
  }
});



module.exports = router;