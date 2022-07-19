const mongoose = require('mongoose');

var users_schema = new mongoose.Schema({name: {type: String}},{strict: false})

var users = mongoose.model('users', users_schema)

module.exports = { users }