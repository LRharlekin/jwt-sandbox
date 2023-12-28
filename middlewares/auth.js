/* 
WHY THIS MIDDLEWARE:
As there will be multiple routes that use the same token validation, it makes sense to make this resuable, and then simply register the middleware on those routes that require authentication.

THIS IS ROUTER MIDDLEWARE
*/

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  // HEADER VALIDATION
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log("token: ", token);

  // TOKEN VERIFICATION
  // jwt.verify(token, secretOrPublickey, [options, callback])
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Set up username property on request to be passed on to authorized route
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route.", 401);
  }
};

module.exports = authenticationMiddleware;
