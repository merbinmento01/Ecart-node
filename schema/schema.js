const mongoose = require('mongoose');
const {auth, agency, chat}=require('../dbConnection/dbConnection')

var users_schema = new mongoose.Schema({name: String},{strict: false});
var contacts_schema = new mongoose.Schema({name: String},{strict: false});
var rooms_schema = new mongoose.Schema({_id: { type: String }},{strict: false});
// var agency_schema = new mongoose.Schema({name: {type: String}},{strict: false})

var users = auth.model('users', users_schema);
var contacts = agency.model('contacts',contacts_schema);
var chats = chat.model('rooms',rooms_schema);

module.exports = { users, contacts, chats }