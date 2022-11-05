const monngoose = require('mongoose');

const { MongoDB_HOST, MongoDB_DATABASE } = process.env;
const MongoDB_URI = `mongodb://${MongoDB_HOST}/${MongoDB_DATABASE}`

const db = monngoose.connect(MongoDB_URI, {
    
})
.then(db => console.log('database is connected'))
.catch(err => console.log(err));

module.exports = { db };