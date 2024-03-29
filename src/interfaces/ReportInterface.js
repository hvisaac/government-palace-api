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
    media: {
        type: Object,
        default: {
            reportedImage: '',
            resolvedImage: ''
        }
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
        default: 1,
    },
    folio: String,
    date: Date,
    available: {
        type: Boolean,
        default: true,
    },
    notes: {
        type: [{
            body: {
                type: String,
                default: ''
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
}, {
    timestamps: true
});

module.exports = model('reports', ReportSchema);