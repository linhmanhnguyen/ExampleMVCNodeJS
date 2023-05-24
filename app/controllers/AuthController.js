
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAccountModel = require('../models/UserAccountModel');

class AuthController {
    static async Login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserAccountModel.SearchUserAccountByUsername(username);

        if (user.length > 0) {
            const checkPassword = await bcrypt.compare(password, user[0].Password);
            if (!checkPassword) {
                res.status(422).json(
                    {
                        "isSuccess": false,
                        "message": `Password is not correct`,
                    }
                );
            }
            else {
                if (user[0].Status == true) {

                    const token = generateAccessToken(user[0].id, user[0].RoleName);
                    res.send(token);
                }
                else {
                    res.status(422).json(
                        {
                            "isSuccess": false,
                            "message": `Account is not attivated`,
                        }
                    );
                }
            }
        }
        else {
            res.status(404).json(
                {
                    "isSuccess": false,
                    "message": `No records found at the moment.`,
                }
            );
        }

    }
}

/**
 * Function: Tạo ngẫu nhiên Access Token
 */
function generateAccessToken(useraccount_id, role) {
    return jwt.sign({ useraccount_id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' });
}

module.exports = AuthController;