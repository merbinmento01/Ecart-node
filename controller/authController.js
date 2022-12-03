require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

var { users } = require('../schema/schema');
var resHandler = require('../utility/responseHandler');

router.get('/list', (req, res) => {
    users.find((err, response) => {
        if (!err) { 
            res.send(response) 
        } else {
            console.log("unable to retrieve Data:" + JSON.stringify(err, undefined, 2));
        }
    })
});

router.get('/login', (req, res) => {
    try {
          users.aggregate(([{$match: {email: req.query.email}}]),(err,response) => {
            if (response.length) {
                // generatePassword(response, req.query.password);
                if(verifyPassword(response[0], req.query.password)) {
                    const data = {
                        id: response[0]._id || "",
                        email: response[0].email || '',
                        agencyId: response[0].agencyId || '',
                        agencyName: response[0].agencyName || '',
                        firstName: response[0].firstName || '',
                        lastName: response[0].lastName || '',
                        phoneNumber: response[0].phoneNumber || '',
                    }
                    const token = jwt.sign({username: req.query.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
                    resHandler(res,{accessToken: token, data, status_code: 200, message: "Success"}) 
                } else {
                    // return next(new throwError(403,"Invalid Password"));
                    resHandler(res,{status_code: 403, message: "Invalid Password"})
                }
            } else {
                resHandler(res,{data: response, status_code: 200, message:"Email doesn't exist"});
            }
        })
    } catch(err) {
        resHandler(res,{data: err, status_code: 200, message:"Something Went Wrong"});
    }   
})

function verifyPassword(data, checkPass) {
    try{
        let password = data.password;
        let isLogin = bcrypt.compareSync(checkPass, password);
        return isLogin;
    } catch(err) {
        return false;
    }
    
}

// function generatePassword(data, password) {
// const saltRounds = 12;
// const salt = bcrypt.genSaltSync(saltRounds);
// const hash =  bcrypt.hashSync(password, salt);
// console.log(hash);
// }

module.exports = router
