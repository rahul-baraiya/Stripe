const joi = require("joi");
const joiMessages = require("../Utils/customMessages.js");

const registrationValidation = joi.object({
  fullName: joi
    .string()
    .min(3)
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "Full name"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Full name"),
      "string.min": joiMessages.STRING_MIN.replace("ADD:", "Full name"),
    }),
  email: joi
    .string()
    .email()
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "E-mail address"),
      "string.empty": joiMessages.STRING_EMPTY.replace(
        "ADD:",
        "E-mail address"
      ),
      "string.email": joiMessages.EMAIL.replace("ADD:", "E-mail address"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "E-mail address"),
    }),
  password: joi
    .string()
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "Password"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Password"),
      "string.empty": joiMessages.STRING_EMPTY.replace("ADD:", "Password"),
    }),
});

const loginValidation = joi.object({
  email: joi
    .string()
    .email()
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "E-mail address"),
      "string.empty": joiMessages.STRING_EMPTY.replace(
        "ADD:",
        "E-mail address"
      ),
      "string.email": joiMessages.EMAIL.replace("ADD:", "E-mail address"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "E-mail address"),
    }),
  password: joi
    .string()
    .required()
    .messages({
      "string.base": joiMessages.STRING_BASE.replace("ADD:", "Password"),
      "any.required": joiMessages.REQUIRED.replace("ADD:", "Password"),
      "string.empty": joiMessages.STRING_EMPTY.replace("ADD:", "Password"),
    }),
});

module.exports = {
  registrationValidation,
  loginValidation,
};
