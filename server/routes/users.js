const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', function(req, res) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if(err) {
        return res.status(500).json({
          error: "hi"
        });
      } else {
        const user = new User({
          _id: new  mongoose.Types.ObjectId(),
          username: req.body.username,
          password: hash
        });
        console.log(req.body)
        user.save().then(function(result) {
          console.log(result);
          res.status(200).json({
            success: 'New user has been created'
          });
        }).catch(error => {
          res.status(500).json({
            error: error
          });
        });
      }
    });
  });
});

router.post('/login', function(req, res) {
  User.findOne({username: req.body.username})
  .exec()
  .then(function(user) {
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(err) {
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      }
      if(result) {
        const JWTToken = jwt.sign({
            username: user.username,
            _id: user._id
          },
          'supersecret',
          {
            expiresIn: '2h'
          }
        );
        return res.status(200).json({
          success: 'Welcome to the JWT Auth',
          token: JWTToken
        });
      }
      return res.status(401).json({
          failed: 'Unauthorized Access'
      });
    });
  })
  .catch(function(error) {
     res.status(500).json({
        error: error
     });
  });;
});

router.get('/protected', function(req, res, next) {
  jwt.verify(req.headers.token, 'supersecret', function(err, decode) {
    if(err) {
      res.status(401).json({
        message: 'Cannot verify the token',
        error: err 
      })
    }
  })
  next()
}, function(req, res, next) {
  res.json({message: 'hi'})
})

module.exports = router;
