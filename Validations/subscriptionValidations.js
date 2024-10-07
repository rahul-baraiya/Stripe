const joi = require("joi");
const joiMessages = require("../Utils/customMessages.js");

const addSubscriptionPlanValidation = joi.object({
  plan: joi
    .string()
    .min(3)
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace(
        "ADD:",
        "Subscription plan"
      ),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Subscription plan"),
      "string.min": joiMessages.STRING_MIN.replace("ADD:", "Subscription plan"),
    }),
  stripId: joi
    .string()
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "Stripe id"),
      "string.empty": joiMessages.STRING_EMPTY.replace("ADD:", "Stripe id"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Stripe id"),
    }),
  isTrial: joi
    .boolean()
    .required()
    .messages({
      "boolean.base": joiMessages.BOOLEAN_BASE.replace("ADD:", "Is trial"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Is trial"),
    }),
  trailDays: joi
    .number()
    .required()
    .messages({
      "number.base": joiMessages.NUMBER_BASE.replace("ADD:", "Trial days"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Trial days"),
      "number.empty": joiMessages.NUMBER_EMPTY.replace("ADD:", "Trial days"),
    }),
  amount: joi
    .number()
    .required()
    .messages({
      "number.base": joiMessages.NUMBER_BASE.replace("ADD:", "Amount"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Amount"),
      "number.empty": joiMessages.NUMBER_EMPTY.replace("ADD:", "Amount"),
    }),
  type: joi
    .number()
    .required()
    .messages({
      "number.base": joiMessages.NUMBER_BASE.replace(
        "ADD:",
        "Subscription type"
      ),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Subscription type"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Subscription type"),
    }),
});

const createSubscriptionValidation = joi.object({
  id: joi
    .string()
    .min(3)
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "id"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "id"),
      "string.min": joiMessages.STRING_MIN.replace("ADD:", "id"),
    }),
  stripId: joi
    .string()
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "Stripe id"),
      "string.empty": joiMessages.STRING_EMPTY.replace("ADD:", "Stripe id"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Stripe id"),
    }),
  isTrial: joi
    .boolean()
    .required()
    .messages({
      "boolean.base": joiMessages.BOOLEAN_BASE.replace("ADD:", "Is trial"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Is trial"),
    }),
  trailDays: joi
    .number()
    .required()
    .messages({
      "number.base": joiMessages.NUMBER_BASE.replace("ADD:", "Trial days"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Trial days"),
      "number.empty": joiMessages.NUMBER_EMPTY.replace("ADD:", "Trial days"),
    }),
  amount: joi
    .number()
    .required()
    .messages({
      "number.base": joiMessages.NUMBER_BASE.replace("ADD:", "Amount"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Amount"),
      "number.empty": joiMessages.NUMBER_EMPTY.replace("ADD:", "Amount"),
    }),
  type: joi
    .number()
    .required()
    .messages({
      "number.base": joiMessages.NUMBER_BASE.replace(
        "ADD:",
        "Subscription type"
      ),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Subscription type"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Subscription type"),
    }),
});

module.exports = {
  addSubscriptionPlanValidation,
};
