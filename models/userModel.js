const { default: mongoose } = require("mongoose");
const { isEmail } = require("validator");
const hashPassword = require("../controllers/hashPassword");
const bcrypt = require("bcrypt");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  products: [productSchema],
  totalPrice: { type: Number, required: true, default: 0 },
  phone: {
    type: String,
    required: [true, "Please enter your phone number to proceed"],
    maxlength: [11, "Phone number must be exactly 11 digits long"],
    minlength: [11, "Phone number must be exactly 11 digits long"],
    quantity: Number,
    match: [/^\d{11}$/, "Please enter a valid 11-digit phone number"],
  },
  quantity: { type: Number, default: 0 },
  orderDate: { type: Date, default: Date.now },
});
const cartSchemna = new mongoose.Schema({
  products: [productSchema],
  totalPrice: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "the minimum length is 6 characters"],
      maxlength: 12,
    },
    gender: {
      type: String,
      default: "male",
    },
    age: {
      type: Number,
      required: false,
      maxlength: [2, "are you sure your age is correct"],
      minlength: [1, "are you sure your age is correct"],
    },
    cart: [cartSchemna],
    orders: [orderSchema],
    deliveryDetails: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    deliveryInfoProvided: { type: Boolean, default: false },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  const pass = await hashPassword(this.password);
  this.password = pass;
  next();
});

userSchema.statics.login = async function (e, p) {
  const user = await this.findOne({ email: e });
  if (user) {
    const isMatch = await bcrypt.compare(p, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new Error("incorrect password");
    }
  } else {
    throw new Error("incorrect email");
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
