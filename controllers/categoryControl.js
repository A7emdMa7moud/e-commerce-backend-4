const Category = require("../models/categoreModel");
const { SUCCESS } = require("../utils/masages");

const getCategoey = async (req, res) => {
  try {
    const categores = await Category.find({});
    res.status(200).json({ msg: SUCCESS, data: categores });
  } catch (error) {
    res.status(500).json({ SERVER_ERROR, msg: error.message });
  }
};

module.exports = {
  getCategoey,
};
