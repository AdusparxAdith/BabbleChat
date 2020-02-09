const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  created_on: {
    type: Date
  },
  password: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
