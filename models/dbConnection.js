const db_config = require('../config/db.config');
const mongodb =  require('mongoose');

const db = {};

db.url = db_config.url

// mongo connection
mongodb.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Database Connected");
}).catch ( (err) => {
    console.log("Database Connection failed", err);
})

module.exports = mongodb;