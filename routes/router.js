const express = require('express');

const app = express();
const router = express.Router();


var  authController = require('../controller/auth');

router.get('/users', authController);

module.exports = router;
