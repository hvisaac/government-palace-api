const express = require('express');
const hierarchyRouter = express.Router();
const { createHierarchy, deleteHierarchy, updateHierarchy, getHierarchies } = require('../services/hierarchyService');

hierarchyRouter.get('/hierarchy', getHierarchies);
hierarchyRouter.post('/hierarchy', createHierarchy);
hierarchyRouter.put('/:id/hierarchy', updateHierarchy);
hierarchyRouter.delete('/:id/hierarchy', deleteHierarchy);


module.exports = { hierarchyRouter };