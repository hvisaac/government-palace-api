const express = require('express');
const UserRouter = express.Router();
const { signIn, signUp } = require('../services/UserService');

UserRouter.post('/sign-up', signUp);
UserRouter.post('/sign-in', signIn);

module.exports = { UserRouter };