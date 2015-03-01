var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');
var schema = new mongoose.Schema({
    q: String,
    data: String
});

schema.plugin(timestamp, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = db.model('whois', schema, 'whois');