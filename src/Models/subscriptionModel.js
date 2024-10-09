const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    customerId: { type: String, required: true },
    subscriptionId: { type: String, required: false },
    planStripeId: { type: String, required: true },
    invoiceId: { type: String, required: false },
    amount: { type: Number, require: true },
    currency: { type: String, required: true },
    interval: { type: String, required: false },
    intervalCount: { type: Number, required: false },
    trialStart: { type: Date, required: true },
    trialEnd: { type: Date, required: true},
    planStart: { type: Date, required: true },
    planEnd: { type: Date, required: true },
    status: { type: String, required: true },
    isCancelled: { type: Boolean, default: false },
    canceledAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscriptions", subscriptionSchema);

module.exports = Subscription;
