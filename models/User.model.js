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
    },
    pets: {
      type: String,
      trim: true,
      required: [true, "Pet is required."],
    },
    birthday: {
      type: Date,
      trim: true,
      required: [true, "Birthday is required."],
    },
    location: {
      type: String,
      trim: true,
      required: [true, "Location is required."],
    },
    important: {
      type: String,
      trim: true,
      required: [true, "Info is required."],
    },
    bio: {
      type: String,
      trim: true,
      required: [true, "Bio is required."],
    },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
