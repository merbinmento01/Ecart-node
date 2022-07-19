const express = require('express');

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
    console.log(req.query);
    users.find({email: req.query.email}, (err, response) => {
        if (!err) { 
            res.send(response) 
        } else {
            console.log("unable to retrieve Data:" + JSON.stringify(err, undefined, 2));
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

module.exports = router
