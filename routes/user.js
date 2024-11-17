const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyTokenAndAdmin } = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

// @ route GET api/user
// @ desc  Get registered user
// @ access Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Kiểm tra xem id có phải là một ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "ID người dùng không hợp lệ" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "Không tìm thấy người dùng" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Lỗi server");
  }
});
// @ route GET api/user
// @ desc  Get registered user
// @ access Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ route GET api/user/stats
// @ desc  Get total number of users per month
// @ access Private
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   DELETE api/user/:id
// @desc    Delete user by id
// @access  Private (only admin can delete users)
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Tìm và xóa người dùng theo ID từ URL
    const user = await User.findByIdAndDelete(req.params.id);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    // Trả về kết quả thành công
    res.status(200).json({ msg: "User successfully deleted" });
  } catch (err) {
    // Kiểm tra lỗi khi ID không hợp lệ (CastError)
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ route POST api/user
// @ desc  Register user
// @ access Public
router.post(
  "/",
  body("username", "Please enter a username").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body(
    "password",
    "Please password shouldnt be less than 6 characters"
  ).isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).send("User already exists");
      }

      // CREATE A NEW USER
      user = new User({
        firstname,
        lastname,
        username,
        email,
        password,
      });

      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          // only an admin can take CRUD operations to collections & delete any users
          // if not an admin, the user can only make CRUD operations to his/her account
          isAdmin: user.isAdmin,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        {
          expiresIn: '1d',
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const { firstname, lastname, username, email, isAdmin, phone, gender } = req.body;

    // Build user object
    const userFields = {};
    if (firstname) userFields.firstname = firstname;
    if (lastname) userFields.lastname = lastname;
    if (username) userFields.username = username;
    if (email) userFields.email = email;
    if (isAdmin !== undefined) userFields.isAdmin = isAdmin;
    if (phone) userFields.phone = phone;
    if (gender) userFields.gender = gender;

    // Update user
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
