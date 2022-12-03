const express = require('express');

var  authController = require('../controller/authController');
var  contactController = require('../controller/contantController');

const router = express.Router();

router.use('/users', authController);
router.use('/contacts', contactController);

module.exports = router;
