const express = require("express");
const router = express.Router();

// Require service.
const authenticationService = require("../services/authentication.service");

// Login
router.post("/login", (req, res) => {
    authenticationService.login(req.body).then(user => {
        res.status(200).send({
            user
        });
    }).catch(error => {
        if (error.name === "DocumentNotFoundError") error.message = "Login failed, there was no user found with specified email address";
        errorResponse(res, error);
    });
});


module.exports = router;

function errorResponse(res, error) {
    res.status(400).send({
        error: {
            code: 400,
            message: error.message,
            date: new Date()
        }
    });
}

