const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    name: String,
    color: String,
    icon: String,
    reports: String
});

module.exports = model('departments', ReportSchema);