require("dotenv").config();
const mongoose = require("mongoose");
const UserSearch = require("./UserSearch");
const User = require("./user");

const CancerData = require("./CancerData");
const connectDB = () => {
  return mongoose.connect(process.env.CONNECTION_URI);
};

const connection = mongoose.connection;

exports.connectDB = connectDB;
exports.User = User;
exports.CancerData = CancerData;
exports.UserSearch = UserSearch;
exports.connection = connection;
