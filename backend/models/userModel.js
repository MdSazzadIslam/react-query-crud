const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    country: {
      type: String,
      required: [true, "Country is required"],
    },

    profession: {
      type: String,
      required: [true, "Profession is required"],
    },

    language: {
      type: String,
      required: [true, "Language is required"],
    },

    experience: {
      type: Number,
      required: [true, "Experience is required"],
      default: 0,
    },

    email: {
      type: String,
      required: [true, "Language is required"],
      unique: true,
      index: true,
    },
  },
  { timeStamps: true }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
