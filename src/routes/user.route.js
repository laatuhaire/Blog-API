const express = require('express');
const multer = require('multer');
const router = express.Router();
//const upload = multer({ dest: 'uploads/' , limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: (req, file, cb) => { if (file.mimetype.startsWith('image/')) { cb(null, true); } else { cb(new Error('Only image files are allowed!')); } }
//}); //Auto creates folder
    
const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { loginUser, registerUser } = require('../controllers/user.controller');
const { validateRegister, validateLogin } = require('../validations/user.validations');

const upload = require('../middlewares/upload.js');

router.post('/upload', upload.single('image'), (req, res) => {
    const fileUrl = req.file.path;
    const filename = req.file.filename;

    console.log(filename);
    console.log(fileUrl);

    res.send("Hello from Upload");
});


router.post('/signup', validateRegister, registerUser);    

router.post('/login', validateLogin, loginUser);

module.exports = router;

