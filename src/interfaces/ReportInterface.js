const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    suburb: String,
    street: String,
    department: String,
    description: String,
    status: Number,
    photo: String,
    geolocation: {
        latitude: Number,
        longitude: Number,
    }
});

module.exports = model('reports', ReportSchema);