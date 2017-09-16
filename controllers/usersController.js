const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {

    create: function(req, res) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        User.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_digest: hash,
            email: req.body.email,
            photo: req.body.photo,
        }).then(user => {
            req.login(user, (err) => {
                if (err) return console.log("error");
                res.json({
                    user: user,
                    auth: true,
                })
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    },

    update: function(req, res){
        console.log(req.body.password);
        const salt = bcrypt.genSaltSync();
        const hash = (req.body.password) ? bcrypt.hashSync(req.body.password, salt):"";
        User.update(
            {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                updatePass: req.body.updatePass || false,
                password_digest: hash,
                email: req.body.email,
                photo: req.body.photo,
            },req.params.id,
        ).then(user => {
            res.json({
                user: user,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });
    },

    index: function(req, res){
        User.findAll()
        .then(users => {
            res.json({
                users:users,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({err: err});
        });
    },

    show: function(req, res){
        User.findByUserName(req.params.username)
        .then(user => {
            res.json({
                user: user,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    find: function(req, res){
        User.findByUserId(req.params.id)
        .then(user => {
            res.json({
                user: user,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = usersController;
