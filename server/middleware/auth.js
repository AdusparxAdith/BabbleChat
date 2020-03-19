let jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

let validateToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  validateToken
};
