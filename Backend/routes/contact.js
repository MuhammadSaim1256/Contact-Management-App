const express = require("express");
// const { route } = require("./users");
const router = express.Router();

// @route  GET /api/contact
// @desc   get all contacts
// @access  private

router.get("/", (req, res) => {
  res.send("Get all contacts");
});

// @route  GET /api/contact
// @desc   create a new contact
// @access  private

router.post("/", (req, res) => {
  res.send("Create a new contact");
});

// @route  PUT /api/contact:id
// @desc   update contact by is
// @access  private

router.put("/:id", (req, res) => {
  res.send("Update contact by id");
});

// @route  Delete /api/contact:id
// @desc   Delete contact by is
// @access  private

router.delete("/:id", (req, res) => {
  res.send("Delete contact by id");
});

module.exports = router;
