const jwt = require("jsonwebtoken");

class GenerateAccessToken {
  static GenerateAccessTokenForOwner(
    userAccount_ID,
    userDetail_ID,
    roleName,
    farm_ID
  ) {
    return jwt.sign(
      {
        userAccount_ID: userAccount_ID,
        userDetail_ID: userDetail_ID,
        role: roleName,
        farm_ID: farm_ID,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );
  }

  static GenerateAccessTokenForOwnerWhenLogin(
    userAccount_ID,
    userDetail_ID,
    roleName,
    farm_ID
  ) {
    return jwt.sign(
      {
        userAccount_ID: userAccount_ID,
        userDetail_ID: userDetail_ID,
        role: roleName,
        farm_ID: farm_ID,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );
  }
}

module.exports = GenerateAccessToken;
