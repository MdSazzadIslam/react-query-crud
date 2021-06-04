"use strict";
const userService = require("../services/userService");

exports.getAll = async (req, res, next) => {
  try {
    const products = await userService.getAll(req.userId);
    res.json(products);
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const products = await userService.getById(req.params.id);
    res.json(products);
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.create = async (req, res, next) => {
  try {
    const chkEmailExists = userService.isEmailExists(req.body.email);
    if (chkEmailExists) {
      return res
        .status(201)
        .send({ success: false, msg: "Email already exists!!!" });
    }
    const result = await userService.create(req.body);

    if (result) {
      res.status(201).send({ success: true, msg: "Successfull" });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const isExists = await userService.getById(req.params.id);
    if (isExists) {
      /*   isExists.product = req.body.product;
      isExists.price = req.body.price;
      isExists.quantity = req.body.quantity;
      isExists.user = req.body.user; */

      const result = await userService.update(req.params.id, req.body);

      if (result) {
        res.status(200).send({ success: true, msg: "Successfull" });
      } else {
        return res
          .status(204)
          .send({ success: false, message: "Something went wrong" });
      }
    } else {
      return res.status(400).send({ success: false, msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await userService.delete(req.params.id);
    if (result) {
      res.status(200).send({ success: true, msg: "Deleted" });
    } else {
      return res
        .status(401)
        .send({ success: true, msg: "No record found to delete" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};
