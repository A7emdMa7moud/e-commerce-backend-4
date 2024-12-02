const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsByCategory,
  getProductIdInCategory,
} = require("../controllers/productControl");

// operations;
router.get("/products", getProducts);
router.get("/products/:termPath", getProductsByCategory);
router.get("/products/:categoryType/:productId", getProductIdInCategory);

module.exports = router;
