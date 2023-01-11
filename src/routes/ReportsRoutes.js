const express = require('express');
const ReportsRouter = express.Router();
const { getMyReports,
    saveReport,
    getAllReports,
    countAllReports,
    getReportsByDate,
    getReportById,
    getReportsByContent,
    changeStatus,
    increaseReport,
    confirmReport,
    finishReport,
    updateReport,
} = require('../services/ReportService');
const { sendFinalizedMessage } = require('../services/WhatsAppService');

ReportsRouter.get('/my-reports/count-all-reports', countAllReports);
ReportsRouter.get('/my-reports/:department', getMyReports);
ReportsRouter.get('/my-reports', getAllReports);
ReportsRouter.post('/my-reports/save-report', saveReport);
ReportsRouter.post('/my-reports/get-by-date', getReportsByDate);
ReportsRouter.get('/my-reports/get-by-id/:_id', getReportById);
ReportsRouter.post('/my-reports/get-by-content', getReportsByContent);
ReportsRouter.post('/my-reports/change-status', changeStatus);
ReportsRouter.post('/my-reports/increase-report', increaseReport);
ReportsRouter.post('/my-reports/confirm-report', confirmReport);
ReportsRouter.post('/my-reports/finish-report', finishReport);
ReportsRouter.put('/my-reports/:id/report', updateReport);

module.exports = { ReportsRouter };