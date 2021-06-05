// User model here
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
      unique: true,
    },
    pets: {
      type: String,
      trim: true,
      required: [true, "Pet is required."],
      unique: true,
    },
    birthday: {
      type: Date,
      trim: true,
      required: [true, "Birthday is required."],
      unique: true,
    },
    location: {
      type: String,
      trim: true,
      required: [true, "Location is required."],
      unique: true,
    },
    important: {
      type: String,
      trim: true,
      required: [true, "Info is required."],
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
      required: [true, "Bio is required."],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
