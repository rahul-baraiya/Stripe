const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes.js");
const subscriptionRoutes = require("./subscription.routes.js");

router.get("/", (req, res) => {
  res.send("Welcome to the home page of the Stripe Learning API's");
});

router.use("/user", userRoutes);
router.use("/subscription", subscriptionRoutes);

module.exports = router;
