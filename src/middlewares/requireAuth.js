const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access Denied - no token' });
    }

    const token = authHeader.replace('Bearer ', '');


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(payload.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user; // attach logged-in user to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = requireAuth;