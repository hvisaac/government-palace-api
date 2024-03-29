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
    addSecretariat,
    updateSecretariat,
    deleteSecretariat,
    getSecretariats,
    switchSecretariat,
    confirmPhone
} = require('../services/ConfigService');

ConfigRouter.post('/config/department', addDepartment);
ConfigRouter.get('/config/departments', getDepartments);
ConfigRouter.get('/config/service-phones', getServicePhones);
ConfigRouter.post('/config/service-phones', addServicePhone);
ConfigRouter.delete('/config/:id/department', deleteDepartment);
ConfigRouter.delete('/config/:id/service-phone', deleteServicePhone);
ConfigRouter.put('/config/:id/department', updateDepartment);
ConfigRouter.put('/config/:id/service-phone', updateServicePhone);
ConfigRouter.post('/config/secretariat', addSecretariat);
ConfigRouter.put('/config/:id/secretariat', updateSecretariat);
ConfigRouter.delete('/config/:id/secretariat', deleteSecretariat);
ConfigRouter.get('/config/secretariats', getSecretariats);
ConfigRouter.put('/config/:id/switch-secretariat', switchSecretariat);
ConfigRouter.post('/config/confirm-phone', confirmPhone);

module.exports = { ConfigRouter };