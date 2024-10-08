const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    customerId: { type: String, required: true },
    currency: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: Object, required: false },
    shipping: { type: Object, required: false },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customers", customerSchema);

module.exports = Customer;
