const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
       return res.status(401).json({
          message: "User already Registered",
        });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then(() => {
              res.status(201).json({
                message: "User added successfully",
              });
            })
            .catch((error) => {
              res.status(500).json({
                error: error,
              });
            });
        });
      }
    })
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
       return res.status(500).json({ message: "User not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
           return res.status(400).send({
              message: "Incorrect Pssword"
            });
          }

          const token = jwt.sign({ userId: user._id }, 'vishwakarma', {
            expiresIn: "24h",
          });

          res.status(200).json({
            userId: user._id,
            token: `Ramu ${token}`,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};