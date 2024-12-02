const { default: mongoose } = require("mongoose");

const product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    quantity: { type: Number, required: true },
    inStock: { type: String, default: true },
    newProduct: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("Product", product);

module.exports = Product;
