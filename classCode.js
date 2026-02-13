const bcrypt = require('bcrypt');
const salt = await bcrypt.genSalt(12);
const hashed = await bcrypt.hash(password, salt);
user.password = hashed;
await user.save();

//Login - compare  
const isMatch = await bcrypt.compare(plainPassword, user.password);
if (!isMatch) throw new Error('Invalid credentials');

const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { userId: user._id, name: user.name }, //payload
    process.env.JWT_SECRET, //secret
    { expiresIn: '7d' } //options
);

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
        return res.status(401).json ({ error: 'Access Denied  -  no token' });

    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; //now every route knows who is logged in
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

const requireOwnership = (model) => async (req, res, next) => {
    const item = await model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.userId.toString() !== req.user.userId) 
        return res.status(403).json({ error: 'Forbidden' });
    next();
};
