const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    // destucture authorization from request headers
    const { authorization } = req.headers;

    // check if auth mechanism is valid
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];

      // decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // check if the user really exists
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error("Invalid token or failed to authorize user");

      // handle the control to next middleware
      next();
    } else {
      throw new Error("no or invalid authorization");
    }
  } catch (err) {
    res.status(401);
    next(err);
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    // destucture authorization from request headers
    const { authorization } = req.headers;

    // check if auth mechanism is valid
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];

      // decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // if not an admin throw error
      if (!decoded.isAdmin) {
        throw new Error("Permission denied");
      }

      // check if the user really exisits
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) throw new Error("Invalid token or failed to authorize user");

      // handle the control to next middleware
      next();
    } else {
      throw new Error("no or invalid authorization");
    }
  } catch (err) {
    res.status(401);
    next(err);
  }
};

module.exports = { verifyToken, requireAdmin };
