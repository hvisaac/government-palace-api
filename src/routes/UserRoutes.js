const express = require('express');
const UserRouter = express.Router();
const { SignIn, SignUp } = require('../Services/UserService');

UserRouter.post('/sign-up', SignUp);
UserRouter.post('/sign-in', SignIn);

module.exports = { UserRouter };