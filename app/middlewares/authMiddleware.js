const jwt = require("jsonwebtoken");
const ReturnResponseUtil = require("../utils/returnResponse");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ReturnResponseUtil.returnResponse(res, 401, false, `Unauthorized`);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return ReturnResponseUtil.returnResponse(res, 403, false, err);
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
