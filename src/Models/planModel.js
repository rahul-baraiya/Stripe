const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    plan: { type: String, required: true },
    stripId: { type: String, required: true },
    isTrial: { type: Boolean, default: false },
    trailDays: { type: Number, require: true },
    amount: { type: Number, require: true },
    type: { type: Number, require: true }, // 0 > Monthly, 1 > Yearly, 2 > Lifetime
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plans", planSchema);

module.exports = Plan;
