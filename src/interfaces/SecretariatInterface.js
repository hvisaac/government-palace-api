const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    name: String,
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('secretariats', ReportSchema);