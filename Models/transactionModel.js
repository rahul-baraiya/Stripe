const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    customerId: { type: String, required: true },
    chargeId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;
