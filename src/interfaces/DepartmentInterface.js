const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    name: String,
    color: String,
    icon: String,
    info: String,
    secretariat: String,
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('departments', ReportSchema);