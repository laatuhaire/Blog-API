const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { loginUser, registerUser } = require('../controllers/user.controller');
const { validateRegister, validateLogin } = require('../validations/user.validations');

router.post('/signup', validateRegister, registerUser);    

router.post('/login', validateLogin, loginUser);

module.exports = router;

