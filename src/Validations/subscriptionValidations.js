const Joi = require("joi");

const addSubscriptionPlanValidation = Joi.object({
  plan: Joi.string().min(3).max(50).trim().required(),
  stripId: Joi.string().min(8).max(50).trim().required(),
  isTrial: Joi.boolean().required(),
  trailDays: Joi.number().integer().min(0).max(365).required(),
  amount: Joi.number().positive().precision(2).required(),
  type: Joi.number().valid(0, 1, 2, 3).required(),
});

module.exports = {
  addSubscriptionPlanValidation,
};
