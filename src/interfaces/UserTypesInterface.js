const { Schema, model } = require('mongoose');

const UserTypesSchema = new Schema({
    _id: String,
    name: String,
    readOnly: Boolean,
    supersu: Boolean
});

module.exports = model('UserTypes', UserTypesSchema);