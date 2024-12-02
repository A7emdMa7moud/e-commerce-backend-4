const { default: mongoose } = require("mongoose");

const category = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "categorys",
    },
  },
  { versionKey: false }
);

const Category = mongoose.model("category", category);

module.exports = Category;
