const { Schema, model } = require('mongoose');

const ServicePhoneSchema = new Schema({
    id: String,
    phone: String,
    name: String,
});

module.exports = model('service_phones', ServicePhoneSchema);