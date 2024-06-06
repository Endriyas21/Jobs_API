const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("bearer")) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
  const token = authHeader.split("")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(payload.userId).select("-password");
    req.user = user;
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

module.exports = auth;
