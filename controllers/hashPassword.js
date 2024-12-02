const bcrypt = require("bcrypt");
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hash(password, salt);
  return password;
};

module.exports = hashPassword;
