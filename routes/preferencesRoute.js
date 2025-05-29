const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/UserModel");

router.get("/", auth, async (req, res) => {
  try {
    const {preferences} = req.user;
    res.json(preferences || {});
  } catch (err) {
    res.status(500).json({message: "Failed to retrieve preferences"});
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const {categories, languages} = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({message: "User not found"});

    // Update preferences
    user.preferences = {
      categories: Array.isArray(categories) ? categories : [],
      languages: Array.isArray(languages) ? languages : [],
    };

    await user.save();

    res.json({
      message: "Preferences updated successfully",
      preferences: req.user.preferences,
    });
  } catch (err) {
    res.status(500).json({message: "Failed to update preferences"});
  }
});

module.exports = router;
