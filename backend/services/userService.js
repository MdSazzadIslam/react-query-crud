"use strict";
const User = require("../models/userModel");

class userService {
  async getAll(_id) {
    return await User.find({});
  }

  async getById(id) {
    return await User.findById(id);
  }

  async create(data) {
    return await User(data).save();
  }

  async update(id, data) {
    return await User.findOneAndUpdate({ _id: id }, { $set: data });
  }

  async delete(id) {
    return await User.findByIdAndDelete({ _id: id });
  }

  async isEmailExists(email) {
    return await User.find({ email: email });
  }
}
module.exports = new userService();
