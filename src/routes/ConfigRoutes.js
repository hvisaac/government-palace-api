const express = require('express');
const ConfigRouter = express.Router();
const {
    addDepartment,
    addUserType,
    getDepartments,
    getUserTypes,
    getServicePhones,
    addServicePhone,
    getUserType,
    deleteDepartment,
    deleteServicePhone,
    deleteUserType,
    updateDepartment,
    updateServicePhone,
    updateUserType } = require('../services/ConfigService');

ConfigRouter.post('/config/add-user-type', addUserType);
ConfigRouter.post('/config/add-department', addDepartment);
ConfigRouter.get('/config/departments', getDepartments);
ConfigRouter.get('/config/user-types', getUserTypes);
ConfigRouter.get('/config/service-phones', getServicePhones);
ConfigRouter.post('/config/service-phones', addServicePhone);
ConfigRouter.get('/config/user-types/:_id', getUserType);
ConfigRouter.delete('/config/:id/department', deleteDepartment);
ConfigRouter.delete('/config/:id/user-type', deleteUserType);
ConfigRouter.delete('/config/:id/service-phone', deleteServicePhone);
ConfigRouter.put('/config/:id/department', updateDepartment);
ConfigRouter.put('/config/:id/service-phone', updateServicePhone);
ConfigRouter.put('/config/:id/user-type', updateUserType);

module.exports = { ConfigRouter };