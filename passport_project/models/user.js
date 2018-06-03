const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/passportblog');


// define a user, setting up the user table, similar to how we set up a table in postico
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    github_id: Sequelize.STRING,
});

// only need this once
User.sync();

module.exports = User;