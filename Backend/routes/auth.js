const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const auth = require("../middlewares/auth");

const router = express.Router();

// @routes Get /api/auth
// @des get login data
// @acces private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 401,
      msg: "Server error",
    });
  }
});

// @routes POST /api/auth
// @des Login User
// @acces public

router.post(
  "/",
  [
    check("email", "Please enter your valid email address").isEmail(),
    check("password", "Please enter your password.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          status: 400,
          msg: "User with this email does not exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          msg: "Invalid Password",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  }
);

module.exports = router;
