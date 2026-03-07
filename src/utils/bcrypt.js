const bcrypt = require('bcrypt');  

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};    

module.exports = { 
    hashedPassword 
};