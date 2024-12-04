const User = require("../models/userModel");
const {
  UPDATED,
  BAD_REQUEST,
  NOT_FOUND,
  SUCCESS,
} = require("../utils/masages");
// get user cart
const userCart = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userCart = await User.findById(userId, "cart");
    if (!userCart) {
      res
        .status(BAD_REQUEST.code)
        .json({ BAD_REQUEST, msg: "user is not defind" });
    }
    res.status(200).json({ SUCCESS, userCart });
  } catch (error) {
    res.status(500).json({ BAD_REQUEST, error: error.message });
  }
};
// get user orders
const userOrder = async (req, res) => {
  try {
    const userId = req.params.uid;
    const userOrder = await User.findById(userId, "orders");
    if (!userOrder) {
      res
        .status(BAD_REQUEST.code)
        .json({ BAD_REQUEST, msg: "user is not defind" });
    }
    res.status(200).json({ SUCCESS, userOrder });
  } catch (error) {
    res.status(500).json({ BAD_REQUEST, error: error.message });
  }
};
// update only cart
const updata_cart = async (req, res) => {
  try {
    const userId = req.params.uid;
    const { cart } = req.body;
    if (!cart) {
      return res.status(400).json({
        BAD_REQUEST,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { cart } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ NOT_FOUND });
    }
    res.status(200).json({
      UPDATED,
      updatedUser: updatedUser.cart,
    });
  } catch (err) {
    res.status(500).json({
      SERVER_ERROR: err.message,
    });
  }
};
// update only orders
const updata_order = async (req, res) => {
  try {
    const userId = req.params.uid;
    const { orders } = req.body;

    if (!orders) {
      return res.status(400).json({
        BAD_REQUEST,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { orders } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ NOT_FOUND });
    }

    res.status(200).json({
      UPDATED,
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      SERVER_ERROR: err.message,
    });
  }
};
// update delivery details and set deliveryInfoProvided=true
const deliveryDetails = async (req, res) => {
  try {
    const userId = req.params.uid;
    const { deliveryDetails } = req.body;
    if (!deliveryDetails) {
      return res.status(400).json({
        BAD_REQUEST,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { deliveryDetails } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ NOT_FOUND });
    }
    await User.findByIdAndUpdate(
      userId,
      { deliveryInfoProvided: true },
      { new: true }
    );
    res.status(200).json({
      UPDATED,
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      SERVER_ERROR: err.message,
    });
  }
};
module.exports = {
  userCart,
  userOrder,
  updata_cart,
  updata_order,
  deliveryDetails,
};
