const jwt = require('jsonwebtoken');

class GenerateAccessToken {
    static GenerateAccessTokenForOwner(userAccount_ID, userDetail_ID, roleName) {
        return jwt.sign(
            { userAccount_ID: userAccount_ID, userDetail_ID: userDetail_ID, role: roleName },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120m' });
    }
}

module.exports = GenerateAccessToken;