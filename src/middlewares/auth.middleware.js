const jwt = require('jsonwebtoken');

// Middleware to check ownership
const requireOwnership = (model) => async (req, res, next) => {
    const item = await model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = {
    requireOwnership
};
