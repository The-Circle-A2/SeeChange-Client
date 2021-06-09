const User = require('../models/user.model');
const Post = require('../models/post.model');
const driver = require('../models/neo4j')

// Retrieve all Users from the database.
exports.findAll = async () => {
    return await User.find({}).select({__v: 0});
};

// Find a single User with an id
exports.findOne = async (id) => {
    const user = await User.findOne({_id :id})
        .select({
            password: 0
        });
    return user;
};
