const express = require("express");
const {
  updata_cart,
  updata_order,
  deliveryDetails,
} = require("../controllers/userControl");
const router = express.Router();

// updata cart
router.put("/cart/:uid", updata_cart);
// updata order
router.put("/order/:uid", updata_order);
// update delivery details
router.put("/deliveryDetails/:uid", deliveryDetails);

module.exports = router;
