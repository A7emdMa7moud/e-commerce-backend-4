const Category = require("../models/categoreModel");

const getCategories = async () => {
  const categores = await Category.find({});
  const arrCategores = Array.from(categores);
  const items = [];
  arrCategores.map((i) => {
    items.push(i.name);
  });
  return items;
};

module.exports = getCategories;
