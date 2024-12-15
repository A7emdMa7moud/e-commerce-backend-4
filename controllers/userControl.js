const User = require("../models/userModel");
const {
  UPDATED,
  BAD_REQUEST,
  NOT_FOUND,
  SUCCESS,
  SERVER_ERROR,
} = require("../utils/masages");

const userDetails = async (req, res) => {
  try {
    const userId = req.params.uid;
    const details = await User.findById(
      userId,
      "name email age gender phone deliveryInfoProvided"
    );
    if (!details) {
      res
        .status(BAD_REQUEST.code)
        .json({ BAD_REQUEST, msg: "user is not defind" });
    }
    res.status(200).json({ SUCCESS, details });
  } catch (error) {
    res.status(500).json({ BAD_REQUEST, error: error.message });
  }
};

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
// update order and reset cart
const updata_order = async (req, res) => {
  try {
    const userId = req.params.uid;
    const { order } = req.body;

    if (!order) {
      return res.status(400).json({
        BAD_REQUEST,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: order },
        $set: { cart: [] },
      },
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
  userDetails,
  userCart,
  userOrder,
  updata_cart,
  updata_order,
  deliveryDetails,
};
