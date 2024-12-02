const Product = require("../models/productModel");
const getCategories = require("./getCategories");
const {
  CREATED,
  SUCCESS,
  BAD_REQUEST,
  SERVER_ERROR,
  DELETED,
  UPDATED,
} = require("../utils/masages");
// [GET] get products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ SUCCESS, data: products });
  } catch (error) {
    res.status(400).json({ BAD_REQUEST, msg: error.message });
  }
};
// [GET] get product by ID
const getProductsByCategory = async (req, res) => {
  const { termPath } = req.params;
  console.log("termPath => ", termPath);
  getCategories().then(async (categories) => {
    try {
      console.log("categories => ", categories);
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
// [GET] get product by ID in category and get category
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
module.exports = {
  getProducts,
  getProductsByCategory,
  getProductIdInCategory,
};
