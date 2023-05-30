const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: emailValidator.validate,
    },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
