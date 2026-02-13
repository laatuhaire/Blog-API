const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { loginUser, registerUser } = require('../controllers/user.controller');

router.post('/signup', registerUser);    

router.post('/login', loginUser);

module.exports = router;

