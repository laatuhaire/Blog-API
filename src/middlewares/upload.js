const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'heic']   
    }
});

const upload = multer({ 
    storage: storage 
//    limits: { fileSize: 2 * 1024 * 1024 }, 
});    

module.exports = upload;

