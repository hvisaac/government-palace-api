const express = require('express');
const UserRouter = express.Router();
const { signIn, signUp, getUsers, getUsersPerDepartment, deleteUser, updateUser, changeUserAndPassword } = require('../services/UserService');

UserRouter.post('/sign-up', signUp);
UserRouter.post('/sign-in', signIn);
UserRouter.get('/users', getUsers);
UserRouter.get('/users/:department', getUsersPerDepartment);
UserRouter.delete('/users/:id/user', deleteUser);
UserRouter.put('/users/:id/user', updateUser);
UserRouter.put('/users/:id/user-and-password', changeUserAndPassword);

module.exports = { UserRouter };