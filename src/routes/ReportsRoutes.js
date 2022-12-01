const express = require('express');
const ReportsRouter = express.Router();
const { getMyReports,
    saveReport,
    getAllReports,
    countAllReports,
    getReportsByDate,
    getReportById,
    getReportsByContent,
    changeStatus } = require('../services/ReportService');

ReportsRouter.get('/my-reports/count-all-reports', countAllReports);
ReportsRouter.get('/my-reports/:department', getMyReports);
ReportsRouter.get('/my-reports', getAllReports);
ReportsRouter.post('/my-reports/save-report', saveReport);
ReportsRouter.post('/my-reports/get-by-date', getReportsByDate);
ReportsRouter.get('/my-reports/get-by-id/:_id', getReportById);
ReportsRouter.post('/my-reports/get-by-content', getReportsByContent);
ReportsRouter.post('/my-reports/change-status', changeStatus);

module.exports = { ReportsRouter };