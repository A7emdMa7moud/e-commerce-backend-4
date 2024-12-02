const { default: mongoose } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const hashPassword = require("../controllers/hashPassword");
const bcrypt = require("bcrypt");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const deliverySchema = new mongoose.Schema(
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
      required: true,
      maxlength: [2, "are you sure your age is correct"],
      minlength: [1, "are you sure your age is correct"],
    },
    orders: [
      {
        customer: {
          userId: { type: String, required: true },
          name: { type: String, required: true },
          email: {
            type: String,
            required: true,
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
          default: "Pending",
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
    ],
  },
  { versionKey: false }
);

deliverySchema.pre("save", async function (next) {
  const pass = await hashPassword(this.password);
  this.password = pass;
  next();
});

deliverySchema.statics.login = async function (e, p) {
  const admin = await this.findOne({ email: e });
  if (admin) {
    const isMatch = await bcrypt.compare(p, admin.password);
    if (isMatch) {
      return admin;
    } else {
      throw new Error("incorrect password");
    }
  } else {
    throw new Error("incorrect email");
  }
};

const Delivery = mongoose.model("delivery", deliverySchema);

module.exports = Delivery;
