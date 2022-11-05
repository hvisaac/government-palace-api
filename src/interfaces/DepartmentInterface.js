const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    _id: String,
    name: String,
    color: String,
    icon: String
});

module.exports = model('departments', ReportSchema);