const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const orderSchema = new mongoose.Schema(
  {
    customer: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [
          isEmail,
          "Please enter a valid email address. This email has already placed an order.",
        ],
      },
      phone: { type: String, required: true },
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    products: [productSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "celivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit card", "payPal", "cash on delivery"],
      default: "cash on delivery",
      required: true,
    },
    PaymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    deliveryDate: { type: Date, required: true },
    orderDate: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 },
    customerNotes: { type: String },
  },
  { versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
