const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { fullname, username, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      fullname,
      username,
      hash_password,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: _user,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created Successfully..!",
        });
      }
    });
  });
};


exports.signin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  console.log("dsadsad", user)
  if (!user)
    return res.status(400).json({ message: "User not exists!" });
  const isPassword = await user.authenticate(req.body.password);
  if (!isPassword) return res.status(400).json({
    message: "Password is incorect!",
  })
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    token,
    user: user.fullname
  });
};