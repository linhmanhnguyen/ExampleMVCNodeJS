const ReturnResponseUtil = require("../utils/returnResponse");

function authorize(roles) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      ReturnResponseUtil.returnResponse(
        res,
        403,
        false,
        `Your role '${userRole}' is not allowed to perform this action`
      );
    }

    next();
  };
}

module.exports = { authorize };
