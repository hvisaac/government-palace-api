const express = require('express');
const ConfigRouter = express.Router();
const {
    addDepartment,
    getDepartments,
    getServicePhones,
    addServicePhone,
    deleteDepartment,
    deleteServicePhone,
    updateDepartment,
    updateServicePhone,
} = require('../services/ConfigService');

ConfigRouter.post('/config/department', addDepartment);
ConfigRouter.get('/config/departments', getDepartments);
ConfigRouter.get('/config/service-phones', getServicePhones);
ConfigRouter.post('/config/service-phones', addServicePhone);
ConfigRouter.delete('/config/:id/department', deleteDepartment);
ConfigRouter.delete('/config/:id/service-phone', deleteServicePhone);
ConfigRouter.put('/config/:id/department', updateDepartment);
ConfigRouter.put('/config/:id/service-phone', updateServicePhone);

module.exports = { ConfigRouter };