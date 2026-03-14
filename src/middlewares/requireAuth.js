// src/middlewares/requireAuth.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access Denied - no token' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Attach full user document
        const user = await UserModel.findById(payload.id); // payload.id matches generateAccessToken
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user; // use user._id in article controller
        next();
    } catch (error) {
        console.error('JWT verify error:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = requireAuth;