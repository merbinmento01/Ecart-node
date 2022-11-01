const db_config = require('../config/db.config');
const mongodb =  require('mongoose');

// mongo connection for single db

// mongodb.connect(db_config.auth_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then( () => {
//     console.log("Database Connected");
// }).catch ( (err) => {
//     console.log("Database Connection failed", err);
// })

// module.exports = mongodb ;


// mongo connection for Multiple db

var auth = mongodb.createConnection(db_config.auth_url);
var agency = mongodb.createConnection(db_config.agency_url);

auth.on('error', console.error.bind(console, 'connection error:'));
auth.once('open', () => {
  console.log('connected to users');
});

agency.on('error', console.error.bind(console, 'connection error:'));
agency.once('open', () => {
  console.log('connected to agencies');
});

module.exports = {auth, agency};