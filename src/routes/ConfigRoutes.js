const express = require('express');
const ConfigRouter = express.Router();
const { addDepartment, addUserTyoe, getDepartments } = require('../services/ConfigService');

ConfigRouter.post('/config/add-user-type', addUserTyoe);
ConfigRouter.post('/config/add-department', addDepartment);
ConfigRouter.get('/config/departments', getDepartments);


module.exports = { ConfigRouter };