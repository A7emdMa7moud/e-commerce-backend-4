const User = require("../models/userModel");
const createToken = require("./createToken");
const valiedetionError = require("./valiedetionErrors");
const {
  LOGIN_SUCCESS,
  INVALID_CREDENTIALS,
  CREATED,
} = require("../utils/masages");

const login_POST = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(200).json({
      LOGIN_SUCCESS,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        phone: user.phone,
        cart: user.cart,
        orders: user.orders,
        theme: user.theme,
      },
    });
  } catch (error) {
    const errors = valiedetionError(error);
    res.status(500).json({ INVALID_CREDENTIALS, errors });
  }
};
const sginup_POST = async (req, res) => {
  try {
    const { name, email, password, gender, age, phone, theme } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      gender,
      age,
      phone,
      theme,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
    });

    res.status(201).json({
      CREATED,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        age: user.age,
        phone: user.phone,
        cart: user.cart,
        orders: user.orders,
        theme: user.theme,
      },
    });
  } catch (err) {
    const error = valiedetionError(err);
    res.status(500).json({ INVALID_CREDENTIALS, error });
  }
};
const logout_GET = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ msg: "logged out" });
  } catch (error) {
    res.status(500).json({ msg: "logout failed", error });
  }
};

module.exports = { login_POST, sginup_POST, logout_GET };
