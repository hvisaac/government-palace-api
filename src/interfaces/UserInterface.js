const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: String,
    phone: String,
    password: String,
    name: String,
    lastname: String,
    urlPhoto: String,
    departments: [String],
    permissions: {
        waitingStatus: Boolean,
        workingStatus: Boolean,
        finishStatus: Boolean,
        transfer: Boolean
    },
    hierarchy: String,
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('users', UserSchema);