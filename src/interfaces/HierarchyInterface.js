const { Schema, model } = require('mongoose');

const hierarchySchema = new Schema({
    id: String,
    name: String,
    level: Number,
});

module.exports = model('hierarchies', hierarchySchema);