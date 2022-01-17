const User = require("../models/user_model");

module.exports.profile = (req, res) => {
  console.log(req);
  User.findById(req.user._id, (err, user) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      if (!user) {
        res.status(404).json({ error: "User does not exist!" });
      } else {
        res.status(200).json(user);
      }
    }
  });
};
