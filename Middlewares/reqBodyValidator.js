const { errorResponse } = require("../Utils/responseMsg.js");

const reqBodyValidator = (validationSchema) => (req, res, next) => {
  const validationResult = validationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    errMessage = validationResult.error.details[0].message;
    res.send(errorResponse(errMessage));
  } else {
    next();
  }
};

module.exports = reqBodyValidator;
