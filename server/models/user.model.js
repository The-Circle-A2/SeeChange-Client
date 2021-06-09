const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validationRegex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

const userSchema = new Schema({
    firstName: {
        type: String,
        required: "First name is required",
    },
    lastName: {
        type: String,
        required: "Last name is required",
    },
    userName: {
      type: String,
      required: "Username is required",
      unique: true
    },
    bio: {
      type: String,
    },
    birthDate: {
      type: Date,
      required: "Birth date is required"
    },
    email: {
        type: String,
        required: "Email is required",
        match: [validationRegex.email, "Email must be valid"],
        unique: true
    },
    password: {
        type: String,
        required: "Password is required",
    }
    }, {
        versionKey: false
    }
);

module.exports = mongoose.model('user', userSchema);
