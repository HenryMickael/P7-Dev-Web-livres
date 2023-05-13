const mongoose = require("mongoose");

const uniqueValitador = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  User: [
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
  ],
});

userSchema.plugin(uniqueValitador);

module.exports = mongoose.model("User", userSchema);
