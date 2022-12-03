//import reqiured
const express = require('express');
const cors = require('cors');

const socket = require('./socket/socket');
const router = require('./routes/router');
var  authController = require('./controller/authController');


// Initailzing app
const app = express();


// Enabling CORS origin for all
app.use(cors());
app.use(router)

// parse requests of content-type - application/json
app.use(express.json());

// parse the data from the req for futher use in backend
app.use(express.urlencoded({ extended: true }));

// get function
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
  });

// app.use('/users', authController);

// Listening port for API
app.listen(3003, () => {
    console.log("Server up on port 3000");
})



