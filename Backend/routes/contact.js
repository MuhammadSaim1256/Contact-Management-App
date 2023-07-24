const express = require("express");
const auth = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const Contact = require("../model/Contact");
const mongoose = require("mongoose");
const router = express.Router();

// @route  GET /api/contact
// @desc   get all contacts
// @access  private

router.get(
  "/",
  [
    auth,
    [check("name", "Please enter your valid name").exists()],
    [
      check("phone", "Please enter your valid mobile number").isLength({
        min: 12,
      }),
    ],
  ],
  async (req, res) => {
    try {
      const contacts = await Contact.find({ user: req.user.id }).sort({
        createdAt: -1,
      });
      res.json(contacts); // Send the contacts array in the response
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  }
);

// @route  GET /api/contact
// @desc   create a new contact
// @access  private

router.post(
  "/",
  [
    auth,
    [check("name", "Please enter your valid name").exists()],
    [
      check("phone", "Please enter your valid mobile number #").isLength({
        min: 11,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        msg: errors.array(),
      });
    }
    const { name, email, phone, relation } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        relation,
        user: req.user.id,
      });
      await newContact.save();
      res.json(newContact);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        msg: "Server error",
      });
    }
  }
);

// @route  PUT /api/contact:id
// @desc   update contact by is
// @access  private

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      msg: "Invalid Contact Id",
    });
  }

  const { name, email, phone, relation } = req.body;
  try {
    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 400,
        msg: "Data is missing",
      });
    }
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({
        status: 400,
        msg: "Invalid Contact Id",
      });
    }

    await Contact.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      relation,
    });
    res.json({
      msg: "Contact Update Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: "Server Error",
    });
  }
});

// @route  Delete /api/contact:id
// @desc   Delete contact by is
// @access  private

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const contact = await Contact.findById(objectId);
    if (!contact) {
      return res.status(400).json({
        status: 400,
        msg: "Contact not found",
      });
    }
    await Contact.findByIdAndDelete(objectId);

    res.json({
      msg: "Contact delete successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 500,
      msg: "Server Error",
    });
  }
});

module.exports = router;
