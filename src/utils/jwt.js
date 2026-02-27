const jwt = require('jsonwebtoken');   

const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });   
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};