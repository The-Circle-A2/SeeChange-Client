const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Login user
exports.login = async (user) => {
    const errorMsg = "Authentication failed, email or password is incorrect";

    if (!user.hasOwnProperty("email")) throw Error("Login failed, email is required");
    if (!user.hasOwnProperty("password")) throw Error("Login failed, password is required");

    if (!mailRegex.test(user.email)) throw Error("Login failed, email is invalid");
    if (user.password.length < 5) throw Error("Login failed, password is invalid");

    const dbUser = await User.findOne({
        email: user.email
    }).orFail();

    // const match = await bcrypt.compare(user.password, dbUser.password);
    // if (!match) throw Error(errorMsg);

    return {
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        id: dbUser._id,
        token: assignToken(dbUser)
    }
};


function assignToken(user) {
    return jwt.sign({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
    }, "secretkey", {
        expiresIn: "24h"
    });
}
