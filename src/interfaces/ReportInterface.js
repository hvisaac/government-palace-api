const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    department: String,
    description: String,
    status: Number,
    photo: String,
    geolocation: {
        latitude: Number,
        longitude: Number,
    },
    date: Date,
}, {
    timestamps: true
});

module.exports = model('reports', ReportSchema);