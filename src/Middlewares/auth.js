const User = require("../Models/userModel.js");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../Models/tokenModel.js");
const { errorResponse } = require("../Utils/responseMsg.js");
const { decodeToken } = require("../Utils/jwt.js");

const verifyToken = async (req, res, next) => {
  try {
    let token =
      req.headers["authorization"] || req.body.token || req.query.token;

    if (req.headers["authorization"]) {
      token = token.substring(7);
    }
    if (!token) {
      return res
        .status(401)
        .json(errorResponse(401, "Please provide a valid token."));
    }

    const blacklistedToken = await BlacklistToken.findOne({ token });
    if (blacklistedToken) {
      return res
        .status(419)
        .json(
          errorResponse(419, "This session has expired, please try again!")
        );
    }

    const user = await User.findOne({ _id: decodeToken(token).user_id });

    if (!user) {
      return res
        .status(404)
        .json(
          errorResponse(
            404,
            "User Not Found, Please Register to Access this Service"
          )
        );
    }

    req.user = user;
    console.log("Success! Token verification completed successfully.");
    next();
  } catch (error) {
    console.log("Oops, there was an issue with token verification." + error);
    next(error);
  }
};

module.exports = verifyToken;
