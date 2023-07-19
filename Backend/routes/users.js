const express = require("express");
const router = express.Router();

// @routes POST/api/user
// @desc Register new user
// @access public

router.post("/", (req, res) => {
  res.send("Register a new user");
});

// @routes POST/api/user
// @desc Register new user
// @access public

router.post("/", (req, res) => {
  res.send("Register a new user");
});

module.exports = router;
