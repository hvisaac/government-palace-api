const { Schema, model } = require('mongoose');

const ServicePhoneSchema = new Schema({
    id: String,
    phone: String,
    name: String,
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('service_phones', ServicePhoneSchema);