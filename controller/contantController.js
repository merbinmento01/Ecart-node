require('dotenv').config();

const express = require('express');

const router = express.Router();

var { users } = require('../schema/schema');
var resHandler = require('../utility/responseHandler');
var config = require('../config/db.config')

router.get('/list', (req, res)=> {
    try {
        users.aggregate(([{$match: {agencyId: req.query.agencyId!=="Safilaf"? "Safilaf": "Arlynk"}},{$limit: config.CONSTANTS.limit}]),(err,response) => {
          if (response.length) {
            resHandler(res,{list: response, status_code: 200, message: "Success"}) 
          } else {
            resHandler(res,{list: response, status_code: 200, message:"No data found"});
          }
      })
  } catch(err) {
      resHandler(res,{data: err, status_code: 200, message:"Something Went Wrong"});
  }
})


module.exports = router;