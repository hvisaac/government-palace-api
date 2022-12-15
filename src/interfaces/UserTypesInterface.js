const { Schema, model } = require('mongoose');

const UserTypesSchema = new Schema({
    id: String,
    name: String,
    canCreate: Boolean,
    canEdit: Boolean,
    canDelete: Boolean,
    superUser: Boolean,
});

module.exports = model('UserTypes', UserTypesSchema);