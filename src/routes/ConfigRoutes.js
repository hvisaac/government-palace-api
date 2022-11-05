const express = require('express');
const ConfigRouter = express.Router();
const ConfigService = require('../services/ConfigService');

ConfigRouter.post('/add-user-type', ConfigService.AddUserTyoe);

module.exports = { ConfigRouter };