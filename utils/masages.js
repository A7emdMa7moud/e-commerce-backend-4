// General success response
const SUCCESS = {
  msg: "successfully",
  code: 200,
  message: "Request was successful",
};

// Resource creation success response
const CREATED = {
  msg: "successfully",
  code: 201,
  message: "Resource created successfully",
};

// Resource update success response
const UPDATED = {
  msg: "successfully",
  code: 200,
  message: "Resource updated successfully",
};

// Resource deletion success response
const DELETED = {
  msg: "successfully",
  code: 200,
  message: "Resource deleted successfully",
};

// User registration success response
const REGISTER_SUCCESS = {
  msg: "successfully",
  code: 201,
  message: "User registered successfully",
};

// Login success response
const LOGIN_SUCCESS = {
  msg: "successfully",
  code: 200,
  message: "Login successful",
};

// Logout success response
const LOGOUT_SUCCESS = {
  msg: "successfully",
  code: 200,
  message: "Logout successful",
};

// Invalid credentials response for login failure
const INVALID_CREDENTIALS = {
  msg: "client error",
  code: 401,
  message: "Invalid username or password",
};

// User already exists response during registration
const ALREADY_EXISTS = {
  msg: "client error",
  code: 409,
  message: "User already exists",
};

// Bad request response for invalid or incomplete input
const BAD_REQUEST = {
  msg: "client error",
  code: 400,
  message: "Invalid request or missing required fields",
};

// Unauthorized access response for protected routes
const UNAUTHORIZED = {
  msg: "client error",
  code: 401,
  message: "Unauthorized access",
};

// Forbidden access response for restricted resources
const FORBIDDEN = {
  msg: "client error",
  code: 403,
  message: "Access to this resource is forbidden",
};

// Not found response when a resource is unavailable
const NOT_FOUND = {
  msg: "client error",
  code: 404,
  message: "Resource not found",
};

// Validation error response for failed input validation
const VALIDATION_ERROR = {
  msg: "client error",
  code: 422,
  message: "Validation failed for the input data",
};

// Server error response for unexpected failures
const SERVER_ERROR = {
  msg: "server error",
  code: 500,
  message: "Internal server error",
};

// Service unavailable response for temporary issues
const SERVICE_UNAVAILABLE = {
  msg: "server error",
  code: 503,
  message: "Service currently unavailable, try again later",
};

module.exports = {
  SUCCESS,
  CREATED,
  UPDATED,
  DELETED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  INVALID_CREDENTIALS,
  ALREADY_EXISTS,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  VALIDATION_ERROR,
  SERVER_ERROR,
  SERVICE_UNAVAILABLE,
};
