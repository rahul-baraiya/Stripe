const successResponse = (data, code, msg) => {
  return {
    success: true,
    statusCode: code,
    message: msg,
    data: data,
  };
};

const errorResponse = (code, errMessage) => {
  return {
    success: false,
    statusCode: code || 400,
    message: errMessage,
    data: null,
  };
};

module.exports = { successResponse, errorResponse };
