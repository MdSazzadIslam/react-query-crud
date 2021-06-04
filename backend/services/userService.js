"use strict";
const User = require("../models/userModel");

class userService {
  async getAll(_id) {
    return await User.find({ user: _id });
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
}
module.exports = new userService();
