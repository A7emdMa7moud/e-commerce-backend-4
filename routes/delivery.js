const express = require("express");
const {
  login,
  signup,
  logout,
  deliverys,
  delivery,
  deliveryOrders,
  addOrder,
  updataOrderStatus,
} = require("../controllers/deliveryControl");
const router = express.Router();

router.get("/deliverys", deliverys);
router.get("/deliverys/:id", delivery);
router.get("/orders/:id", deliveryOrders);
router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/orders/:id", addOrder);
router.put("/orders/:id", updataOrderStatus);

module.exports = router;
