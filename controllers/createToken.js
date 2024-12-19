const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "ahmed trika");
};

module.exports = createToken;
