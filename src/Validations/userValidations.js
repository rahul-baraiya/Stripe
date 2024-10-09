const Joi = require("joi");

const registrationValidation = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .trim()
    .regex(/^[a-zA-Z\s]+$/)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])")
    )
    .required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])")
    )
    .required(),
});

module.exports = {
  registrationValidation,
  loginValidation,
};
