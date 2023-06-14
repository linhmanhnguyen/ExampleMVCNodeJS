
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAccountModel = require('../models/UserAccountModel');
const UserDetailModel = require('../models/UserDetailModel');
const moment = require('moment-timezone');
const { registerAccountSchema } = require('../validations/userAccountSchema');
const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

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

                    const token = generateAccessToken(user[0].id, user[0].UserDetail_ID, user[0].RoleName);
                    res.status(200).json(
                        {
                            "isSuccess": true,
                            "data": token,
                        }
                    );

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

    static async Register(req, res) {
        try {
            await registerAccountSchema.validateAsync(req.body);

            var username = req.body.username;
            var password = req.body.password;
            var createDate = currentTime;

            var status = true;
            var refreshtoken = generateAccessToken(username);
            var role_ID = 2; // Chủ sở hữu

            var resultAddInfo = await UserDetailModel.InsertUserDetail();
            var userDetail_ID = resultAddInfo.insertId;

            var searchUserAccount = await UserAccountModel.SearchUserAccountByUsername(username);
            if (searchUserAccount.length > 0) {
                res.status(400).json(
                    {
                        "isSuccess": false,
                        "message": `Username existed`,
                    }
                );
            }
            else {
                var result = await UserAccountModel.InsertUserAccount(username, password, createDate, userDetail_ID, refreshtoken)
                if (result) {
                    var userAccount_ID = result.insertId;

                    var resultInsertRole = await UserAccountModel.InsertRoleForUserAccount(userAccount_ID, role_ID, createDate, status);
                    if (resultInsertRole) {
                        res.status(200).json(
                            {
                                "isSuccess": true,
                                "message": `Register Successfully`,
                                "data": userAccount_ID
                            }
                        );
                    }
                    else {
                        res.status(400).json(
                            {
                                "isSuccess": false,
                                "message": `An error has occurred, please try again.`,
                            }
                        );
                    }
                }
                else {
                    res.status(400).json(
                        {
                            "isSuccess": false,
                            "message": `An error has occurred, please try again.`,
                        }
                    );
                }
            }

        } catch (error) {
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );

            console.log(error);
        }
    }
}

/**
 * Function: Tạo ngẫu nhiên Access Token
 */
function generateAccessToken(useraccount_id, userdetail_id, role) {
    return jwt.sign({ useraccount_id, userdetail_id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
}

module.exports = AuthController;
