const express = require('express');
const UserRouter = express.Router();
const { SignIn, SignUp } = require('../services/UserService');

UserRouter.post('/sign-up', SignUp);
UserRouter.post('/sign-in', SignIn);

module.exports = { UserRouter };