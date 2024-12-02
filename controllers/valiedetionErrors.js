const valiedetionError = (err) => {
  // console.log("================================================");
  // console.log({
  //   errors: {
  //     message: err.message,
  //     code: err.code,
  //   },
  // });
  // console.log("================================================");
  const errors = {};

  if (err.message === "incorrect email") {
    errors.email = "Invalid email";
  }
  if (err.message === "incorrect password") {
    errors.password = "invalid password";
  }

  if (err.code === 11000) {
    errors.email = "Email already registered";
  }

  if (
    err.message.includes("user validation failed" || "user validation failed")
    // err.message === "user validation failed" ||
    // "order validation failed"
  ) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }
  return { errors: errors };
};

module.exports = valiedetionError;
