const express = require("express");
const router = express.Router();
const { reqBodyValidator } = require("../Middlewares/validator.js");
const subscriptionValidation = require("../Validations/subscriptionValidations.js");
const subscriptionController = require("../Controllers/subscriptionController.js");
const auth = require("../Middlewares/auth.js");

router.post(
  "/add-plan",
  reqBodyValidator(subscriptionValidation.addSubscriptionPlanValidation),
  subscriptionController.addPlan
);

router.get("/get-plan", auth, subscriptionController.getPlan);

router.post(
  "/create-subscription",
  auth,
  subscriptionController.createSubscription
);

module.exports = router;
