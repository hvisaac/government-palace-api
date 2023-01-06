const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: String,
    phone: {
        type: String,
        unique: true,
        dropDups: true
    },
    password: String,
    name: String,
    lastname: String,
    urlPhoto: String,
    secretariat: String,
    department: String,
    permissions: {
        waitingStatus: {
            type: Boolean,
            default: false
        },
        workingStatus: {
            type: Boolean,
            default: false
        },
        finishStatus: {
            type: Boolean,
            default: false
        },
        transfer: {
            type: Boolean,
            default: false
        }
    },
    hierarchy: String,
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('users', UserSchema);