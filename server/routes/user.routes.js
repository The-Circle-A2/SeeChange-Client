const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization.middleware');

// Require service
const userService = require('../services/user.service');

// GET users
router.get("/", (req, res) => {
    userService.findAll().then(users => {
        res.status(200).send(users);
    }).catch(error => {
        res.status(400).send({
            "error": error
        });
    });
});

// GET one user by id
router.get("/:id", (req, res) => {
    userService.findOne(req.params.id).then(user => {
        res.status(200).send(user);
    }).catch(error => {
        res.status(400).send({
            "error": error
        });
    });
});


module.exports = router;

