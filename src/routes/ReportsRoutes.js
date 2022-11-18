const express = require('express');
const ReportsRouter = express.Router();
const { getMyReports, saveReport, getAllReports, countAllReports, getReportsByDate } = require('../services/ReportService');

ReportsRouter.get('/my-reports/count-all-reports', countAllReports);
ReportsRouter.get('/my-reports/:department', getMyReports);
ReportsRouter.get('/my-reports', getAllReports);
ReportsRouter.post('/my-reports/save-report', saveReport);
ReportsRouter.post('/my-reports/get-by-date', getReportsByDate);

module.exports = { ReportsRouter };