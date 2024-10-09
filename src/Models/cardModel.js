const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    customerId: { type: String, required: true },
    cardId: { type: String, required: false },
    cardHolderName: { type: String, required: false },
    cardNumber: { type: String, required: true },
    cardType: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const Card = mongoose.model("Cards", cardSchema);

module.exports = Card;
