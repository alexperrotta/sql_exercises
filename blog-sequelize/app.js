const express = require('express');
const Sequelize = require('sequelize');
// // refers to an env file where you store your passwords
// const dotenv = require('dotenv');
// dotenv.load();
// const db = {
//     pass: process.env.POSTGRES_PASS,
//     user: process.env.POSTGRES_USER,
//     db: process.env.POSTGRES_PASS,
// }

const bodyParser = require('body-parser');
const app = express();
const sequelize = new Sequelize('postgres://postgres@localhost:5432/blog');

app.use(bodyParser({urlencoded: true}));

sequelize
    .authenticate()
    .then(() => {
        console.log('successfully connected');
    })
    .catch(err => {
        console.log('Unable to connect ' + err);
    });



// define a user, setting up the user table, similar to how we set up a table in postico
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

// will set up a table if there is on, but if the table is already there it won't create again
// User.sync().then(() => {
//     User.create({
//         username: 'alex',
//         password: 'perrotta',
//     });
//     User.create({
//         username: 'kathryn',
//         password: 'parker',
//     });
// })



// main route, find all users
app.get('/', (req, res) => {
    User.findAll().then((users) => {
        res.json(users);
    })
})

// another route, find 3 users
app.get('/getthree', (req, res) => {
    User.findAndCount({
        limit: 3
    }).then(users => {
        res.json(users);
    })
})


// create a new user
app.post('/create', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    });
});

// update a user
app.post('/update', (req, res) => {
    User.update({
        'password': req.body.password,
    },{
        where: {
            username: req.body.username,
        }
    }).then(user => {
        res.json({'success': true});
    })
});

// delete a user
app.post('/delete', (req, res) => {
    User.detroy({
        'password': req.body.password,
    },{
        where: {
            username: req.body.username,
        }
    }).then(user => {
        res.json({'success': true});
    })
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})