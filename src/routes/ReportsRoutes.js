const express = require('express');
const ReportsRouter = express.Router();
const { getMyReports, saveReport, getAllReports } = require('../services/ReportService');

ReportsRouter.get('/my-reports/:department', getMyReports);
ReportsRouter.get('/my-reports', getAllReports);
ReportsRouter.post('/my-reports/save-report', saveReport);

module.exports = { ReportsRouter };