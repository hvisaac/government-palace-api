const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    iduser: String,
    name: String,
    department: String,
    description: String,
    status: String,
    photo: String,
    geolocation: {
        latitude: Number,
        longitude: Number,
    }
});

module.exports = model('reports', ReportSchema);