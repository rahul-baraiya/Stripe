const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign(
    {
      user_id: user._id,
    },
    process.env.TOKEN_PRIVATE_KEY,
    {
      algorithm: process.env.TOKEN_ALGORITHM,
      expiresIn: process.env.TOKEN_EXPIRE,
    }
  );
}

function decodeToken(token) {
  return jwt.verify(token, process.env.TOKEN_PUBLIC_KEY, {
    algorithms: [process.env.TOKEN_ALGORITHM],
  });
}

module.exports = { createToken, decodeToken };
