const express = require('express');
const ReportsRouter = express.Router();
const { getMyReports, saveReport } = require('../Services/ReportService');

ReportsRouter.get('/my-reports/:iduser', getMyReports);
ReportsRouter.post('/my-reports/save-report', saveReport);

module.exports = { ReportsRouter };