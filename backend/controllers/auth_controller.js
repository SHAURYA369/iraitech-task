const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

module.exports.register = (req, res) => {
  User.findOne(
    { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
    (err, user) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        if (user) {
          res.status(400).json({
            error: "User already exists!",
          });
        } else {
          var encryptedPassword = req.body.password;

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              res.status(500).json({
                err,
              });
            } else {
              encryptedPassword = bcrypt.hash(
                encryptedPassword,
                salt,
                (err, hash) => {
                  if (err) {
                    res.status(500).json({ err });
                    console.log(err);
                  } else {
                    encryptedPassword = hash;

                    const newUser = new User({
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      email: req.body.email,
                      password: encryptedPassword,
                      phone: req.body.phone,
                      address: req.body.address,
                    });

                    newUser.save((err, savedUser) => {
                      if (err) {
                        res.status(500).json({
                          err,
                        });
                      } else {
                        res.status(200).json(savedUser);
                      }
                    });
                  }
                }
              );
            }
          });
        }
      }
    }
  );
};

module.exports.login = (req, res) => {
  User.findOne(
    { $or: [{ email: req.body.identifier }, { phone: req.body.identifier }] },
    (err, user) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        if (!user) {
          res.status(404).json({ error: "User not found!" });
        } else {
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) {
              res.status(500).json({ err });
            } else {
              if (!isMatch) {
                res.status(401).json({ error: "Password does not match!" });
              } else {
                jwt.sign(
                  user.toObject(),
                  process.env.JWT_SECRET,
                  { expiresIn: 31556926 }, // 1 year
                  (err, token) => {
                    if (err) {
                      res.status(500).json({ err });
                    } else {
                      res.status(200).json({
                        success: true,
                        user,
                        token,
                      });
                    }
                  }
                );
              }
            }
          });
        }
      }
    }
  );
};
