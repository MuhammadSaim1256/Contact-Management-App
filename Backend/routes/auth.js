const express = require("express");
const router = express.Router();

// @routes Get /api/auth
// @des get login data
// @acces private

router.get("/", (req, res) => {
  res.send("Get login Data");
});

// @routes POST /api/auth
// @des Login User
// @acces public

router.post("/", (req, res) => {
  res.send("Login User");
});

module.exports = router;
