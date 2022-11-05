const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: String,
    phone: String,
    password: String,
    name: String,
    lastname: String,
    urlPhoto: String,
    type: Number,
});

module.exports = model('User', UserSchema);