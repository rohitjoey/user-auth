const mongoose = require("mongoose");

require("dotenv").config();

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(
  conn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("database connected");
  }
);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean,
});

const User = connection.model("User", UserSchema);

module.exports = connection;
