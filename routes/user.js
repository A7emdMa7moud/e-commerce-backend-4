const express = require("express");
const {
  userDetails,
  updata_cart,
  updata_order,
  deliveryDetails,
  userCart,
  userOrder,
} = require("../controllers/userControl");
const router = express.Router();

// get user details
router.get("/user/:uid", userDetails);
// get user cart
router.get("/cart/:uid", userCart);
// get user orders
router.get("/orders/:uid", userOrder);
// updata cart
router.put("/cart/:uid", updata_cart);
// updata order
router.put("/order/:uid", updata_order);
// update delivery details
router.put("/deliveryDetails/:uid", deliveryDetails);

module.exports = router;
