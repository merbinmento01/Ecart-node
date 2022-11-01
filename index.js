//import reqiured
const express = require('express');
const cors = require('cors');

var  authController = require('./controller/auth');

// Initailzing app
const app = express();

// Enabling CORS origin for all
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse the data from the req for futher use in backend
app.use(express.urlencoded({ extended: true }));

// get function
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
  });

app.use('/users', authController);

// Listening port
app.listen(3000, () => {
    console.log("Server up on port 3000");
})

