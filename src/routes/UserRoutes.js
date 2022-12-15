const express = require('express');
const UserRouter = express.Router();
const { signIn, signUp, getUsers, getUsersPerDepartment, deleteUser, updateUser } = require('../services/UserService');

UserRouter.post('/sign-up', signUp);
UserRouter.post('/sign-in', signIn);
UserRouter.get('/users', getUsers);
UserRouter.get('/users/:department', getUsersPerDepartment);
UserRouter.delete('/users/:id/user', deleteUser);
UserRouter.put('/users/:id/user', updateUser);

module.exports = { UserRouter };