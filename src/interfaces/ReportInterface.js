const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
    id: String,
    department: String,
    description: String,
    finishedDescription: {
        type: String,
        default: '',
    },
    status: {
        type: Number,
        default: 0,
    },
    photo: String,
    finishedPhoto: {
        type: String,
        default: '',
    },
    geolocation: {
        latitude: Number,
        longitude: Number,
    },
    users: {
        type: [String],
        default: [],
    },
    count: {
        type: Number,
        default: 0,
    },
    folio: String,
    date: Date,
}, {
    timestamps: true
});

module.exports = model('reports', ReportSchema);