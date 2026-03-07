const UserModel = require('../models/user.model');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashedPassword } = require('../utils/bcrypt.js'); 

//1 end point
const registerUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashed = await hashedPassword(password);   
        
        const user = new UserModel({
            name: name,
            email: email,
            password: hashed
        });

        await user.save();

        return res.status(201).json({ 
            message: 'User registered successfully' 
        });

    } catch (error) {
        next(error);
    }
};

//2 end point
const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );        

        const resUser = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        return res.status(200).json({ 
            message: 'Login successful', 
            user: resUser, 
            token: token 
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};