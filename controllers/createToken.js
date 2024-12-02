const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "ahmed rika");
};

module.exports = createToken;
