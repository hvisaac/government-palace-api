const { Schema, model } = require('mongoose');

const hierarchySchema = new Schema({
    id: String,
    name: String,
    level: Number,
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('hierarchies', hierarchySchema);