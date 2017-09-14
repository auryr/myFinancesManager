const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {

  create: function(req, res) {
      console.log(req.body)
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);
      User.create({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hash,
          email: req.body.email,
          photo: req.body.photo,
          proj_link: req.body.proj_link,
          user_type: req.body.user_type,
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
        id: req.body.id,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        updatePass: req.body.updatePass || false,
        password: hash,
        email: req.body.email,
        img_url: req.body.img_url,
        proj_link: req.body.proj_link,
        user_type: req.body.user_type,
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
