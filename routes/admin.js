const express = require("express");
const {
  get_orders,
  get_users,
  add_orders,
  update_orders,
  getCategoey,
  addCategory,
  getProducts,
  getProductsByCategory,
  getProductIdInCategory,
  getAdmins,
  loginAdmin,
  SginupAdmin,
  logoutAdmin,
  editProduct,
  deleteProduct,
  addProducts,
  get_order,
} = require("../controllers/adminControl");
const router = express.Router();

router.get("/admins", getAdmins);
router.post("/login", loginAdmin);
router.post("/sginup", SginupAdmin);
router.get("/logout", logoutAdmin);
// get users
router.get("/users", get_users);
// add product
router.post("/products", addProducts);
// delete product
router.delete("/products/:productId", deleteProduct);
// update product
router.put("/products/:productId", editProduct);
// get products
router.get("/products", getProducts);
// get product by id
router.get("/products/:termPath", getProductsByCategory);
// get product by id in category
router.get("/products/:categoryType/:productId", getProductIdInCategory);
// get category
router.get("/categorys", getCategoey);
// add category
router.post("/categorys", addCategory);
// get orders
router.get("/orders", get_orders);
// get order
router.get("/order/:id", get_order);
// add orders
router.post("/orders", add_orders);
// update orders
router.put("/orders/:uid", update_orders);

module.exports = router;
