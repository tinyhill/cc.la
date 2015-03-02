var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var db = mongoose.createConnection('mongodb://localhost/cc_la');
var schema = new mongoose.Schema({
    body: String,
    key: String,
    name: String
});

schema.plugin(timestamp, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = db.model('alexa', schema, 'alexa');