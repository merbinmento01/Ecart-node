const express = require('express');
const bcrypt = require('bcrypt');
const shaOne = require('crypto-js/sha1')

const router = express.Router() 

var { users } = require('../schema/auth_schema')

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
    users.findOne({email: req.query.email}, (err, response) => {
        if (!err) {
            // generatePassword(response, req.query.password);
            if(verifyPassword(response, req.query.password)) {
                res.send({response, accessToken: 'sdf4d6564dfsC*&^DXC^XZ*', status_code: 200}) 
            } else {
                res.send("Incorrect Password");
            }
        } else {
            res.send("Email doesn't Exist:");
        }
    })
})

router.delete('/:id', (req, res) => {
    // console.log(req);
    users.deleteOne({_id: req.params.id}, (err, response) => {
        if (!err) { 
            res.send(response) 
        } else {
            console.log("unable to Delete Data:" + JSON.stringify(err, undefined, 2));
        }
    })
})

function verifyPassword(data, checkPass) {
    let password = data.password;
    let isLogin = bcrypt.compareSync(checkPass, password);
    return isLogin;
}

function generatePassword(data, password) {
const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);
const hash =  bcrypt.hashSync(password, salt);
console.log(hash);
}

module.exports = router
