const crypto = require("node:crypto");
const User = require("../Models/userModel.js");
const Token = require("../Models/tokenModel.js");
const { successResponse, errorResponse } = require("../Utils/responseMsg.js");
const { createToken } = require("../Utils/jwt.js");

const registration = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const encryptedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json(errorResponse(409, " This email is already registered."));
    }

    const user = await User.create({
      fullName,
      email,
      password: encryptedPassword,
    });

    const token = createToken(user);
    const { password: _, ...responseUser } = user.toObject();

    res
      .status(201)
      .json(
        successResponse(
          { user: responseUser, token },
          201,
          "Successfully registered."
        )
      );
  } catch (error) {
    console.log(
      `There was an issue into userController:registration: ${error}`
    );
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(errorResponse(404, "This email not registered."));
    }

    if (user.password != encryptedPassword) {
      return res.status(401).json(errorResponse(401, "Password incorrect."));
    }

    const token = createToken(user);
    const { password: _, ...responseUser } = user.toObject();

    res
      .status(200)
      .json(
        successResponse(
          { user: responseUser, token },
          200,
          "Login successfully!"
        )
      );
  } catch (error) {
    console.log(`There was an issue into userController:login: ${error}`);
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    let user = req.user;
    const { password: _, ...responseUser } = user.toObject();
    user = responseUser;

    res.json(successResponse(user, 200, "Profile retrieved."));
  } catch (error) {
    console.log(`There was an issue into userController:profile: ${error}`);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    let token =
      req.headers["authorization"] || req.body.token || req.query.token;

    if (req.headers["authorization"]) {
      token = token.substring(7);
    }
    const tokenBlacklist = await Token.create({
      token,
    });

    res.setHeader("Clear-Site-Data", '"cookies","storage"');
    res.json(successResponse(tokenBlacklist, 200, "Logout successfully."));
  } catch (error) {
    console.log(`There was an issue into userController:profile: ${error}`);
    next(error);
  }
};

module.exports = { registration, login, profile, logout };
