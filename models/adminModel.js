const { default: mongoose } = require("mongoose");
const hashPassword = require("../controllers/hashPassword");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
  },
  { versionKey: false }
);

adminSchema.pre("save", async function (next) {
  const pass = await hashPassword(this.password);
  this.password = pass;
  next();
});

adminSchema.statics.login = async function (e, p) {
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

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
