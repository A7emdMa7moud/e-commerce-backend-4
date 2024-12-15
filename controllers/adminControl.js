const User = require("../models/userModel");
const Order = require("../models/ordersModel");
const Product = require("../models/productModel");
const {
  SUCCESS,
  CREATED,
  SERVER_ERROR,
  BAD_REQUEST,
  DELETED,
  NOT_FOUND,
  UPDATED,
  LOGIN_SUCCESS,
  INVALID_CREDENTIALS,
  LOGOUT_SUCCESS,
} = require("../utils/masages");
const valiedetionError = require("./valiedetionErrors");
const getCategories = require("./getCategories");
const Category = require("../models/categoreModel");
const Admin = require("../models/adminModel");
const createToken = require("./createToken");
// users
const get_users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ SUCCESS, users });
  } catch (error) {
    res.status(404).json({ SERVER_ERROR, error: error.message });
  }
};
// admin
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ SUCCESS, admins });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.login(email, password);
    // console.log("admin logged in => x", admin);
    const token = createToken(admin._id);
    res.cookie("adminJwt", token, {
      httpOnly: true,
    });
    res.status(200).json({
      LOGIN_SUCCESS,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    const errors = valiedetionError(error);
    res.status(500).json({ INVALID_CREDENTIALS, errors });
  }
};
const SginupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.create({
      name,
      email,
      password,
    });
    const token = createToken(admin._id);
    res.cookie("adminJwt", token, {
      httpOnly: true,
    });
    res.status(201).json({ CREATED, admin });
  } catch (err) {
    const error = valiedetionError(err);
    res.status(500).json({ INVALID_CREDENTIALS, error });
  }
};
const logoutAdmin = (req, res) => {
  try {
    res.clearCookie("adminJwt");
    res.json({ msg: "logged out" });
  } catch (error) {
    res.status(500).json({ LOGOUT_SUCCESS });
  }
};
// products
const addProducts = async (req, res) => {
  try {
    const { name, price, category, inStock, quantity, newProduct, discount } =
      req.body;
    if (!name || !price || !inStock || !quantity) {
      return res
        .status(400)
        .json({ BAD_REQUEST, error: "Missing required fields" });
    }
    const product = await Product.create({
      name,
      price,
      category,
      inStock,
      quantity,
      newProduct,
      discount,
    });
    res.status(201).json({ CREATED, data: product });
  } catch (error) {
    res.status(400).json({ BAD_REQUEST, error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ NOT_FOUND, error: "Product not found" });
    }

    res.status(200).json({ DELETED, data: product });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, error });
  }
};
const editProduct = (req, res) => {
  const pid = req.params.productId;
  const productData = req.body;
  Product.findByIdAndUpdate(pid, productData, { new: true })
    .then((productUpdated) => {
      res.status(200).json({ UPDATED, productUpdated });
    })
    .catch((error) => {
      res.status(500).json({ SERVER_ERROR, error });
    });
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ SUCCESS, data: products });
  } catch (error) {
    res.status(400).json({ BAD_REQUEST, msg: error.message });
  }
};
const getProductsByCategory = async (req, res) => {
  const { termPath } = req.params;
  getCategories().then(async (categories) => {
    try {
      // console.log("categories => ", categories);
      if (categories.includes(termPath)) {
        const categorys = await Product.find({ category: termPath });
        res.status(200).json({ SUCCESS, data: categorys });
      } else {
        const products = await Product.findOne({ _id: termPath });
        res.status(200).json({ SUCCESS, data: products });
      }
    } catch (error) {
      res.status(400).json({ BAD_REQUEST, msg: error });
    }
  });
};
const getProductIdInCategory = async (req, res) => {
  const { categoryType, productId } = req.params;
  try {
    const product = await Product.findOne({
      category: categoryType,
      _id: productId,
    });
    res.status(200).json({ SUCCESS, data: product });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, msg: error.message });
  }
};
// category
const getCategoey = async (req, res) => {
  try {
    const categores = await Category.find({});
    res.status(200).json({ msg: SUCCESS, data: categores });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, msg: error.message });
  }
};
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ BAD_REQUEST, msg: "Name is required" });
    }

    const category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        BAD_REQUEST,
        category,
        msg: "This category already exists",
      });
    }

    const newCategory = await Category.create({ name });
    res.status(201).json({ CREATED, data: newCategory });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, msg: error.message });
  }
};
// orders
const get_orders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ SUCCESS, orders });
  } catch (error) {
    res.status(404).json({ SERVER_ERROR, error: error.message });
  }
};
const get_order = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      res.status(200).json({ SUCCESS, data: order });
    }
  } catch (error) {
    res.status(SERVER_ERROR.code).json({ SERVER_ERROR, errors: error.message });
  }
};
const add_orders = async (req, res) => {
  try {
    const orderData = req.body;
    const order = await Order.create(orderData);
    res.status(201).json({ CREATED, order });
  } catch (err) {
    const error = valiedetionError(err);
    res.status(500).json({ message: BAD_REQUEST, error });
  }
};
const update_orders = async (req, res) => {
  try {
    const uId = req.params.uid;
    const updateData = req.body;

    const orderUpdated = await Order.findByIdAndUpdate(uId, updateData, {
      new: true,
    });

    if (!orderUpdated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: orderUpdated });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

module.exports = {
  getAdmins,
  loginAdmin,
  SginupAdmin,
  logoutAdmin,
  get_users,
  addProducts,
  deleteProduct,
  editProduct,
  getProducts,
  getProductsByCategory,
  getProductIdInCategory,
  getCategoey,
  addCategory,
  get_orders,
  get_order,
  add_orders,
  update_orders,
};
