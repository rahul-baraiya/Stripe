const express = require("express");
const router = express.Router();
const userValidation = require("../Validations/userValidations.js");
const { reqBodyValidator } = require("../Middlewares/validator.js");
const userController = require("../Controllers/userController.js");
const auth = require("../Middlewares/auth.js");

router.post(
  "/registration",
  reqBodyValidator(userValidation.registrationValidation),
  userController.registration
);

router.post(
  "/login",
  reqBodyValidator(userValidation.loginValidation),
  userController.login
);

router.get("/profile", auth, userController.profile);

router.get("/logout", auth, userController.logout);

module.exports = router;
