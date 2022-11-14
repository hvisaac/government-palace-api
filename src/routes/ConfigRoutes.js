const express = require('express');
const ConfigRouter = express.Router();
const { AddDepartment, AddUserTyoe } = require('../services/ConfigService');

ConfigRouter.post('/add-user-type', AddUserTyoe);
ConfigRouter.post('/add-department', AddDepartment);


module.exports = { ConfigRouter };