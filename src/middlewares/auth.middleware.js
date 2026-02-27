const jwt = require('jsonwebtoken');

// Middleware to require authentication
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access Denied - no token' });
    }

    const token = authHeader.replace('Bearer ', '');


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // attach logged-in user to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Middleware to check ownership
const requireOwnership = (model) => async (req, res, next) => {
    const item = await model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.userId.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = {
    requireAuth,
    requireOwnership
};
