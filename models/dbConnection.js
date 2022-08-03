const db_config = require('../config/db.config');
const mongodb =  require('mongoose');

// mongo connection
mongodb.connect(db_config.auth_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Database Connected");
}).catch ( (err) => {
    console.log("Database Connection failed", err);
})

// mongodb.connect(db_config.agency_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then( () => {
//     console.log("Database Connected");
// }).catch ( (err) => {
//     console.log("Database Connection failed", err);
// })

module.exports = mongodb;