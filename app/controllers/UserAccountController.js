const userAccountModel = require('../models/UserAccountModel');
const moment = require('moment-timezone');
const { userAccountSchema, updateUserAccountSchema } = require('../validations/userAccountSchema');
const UserAccountModel = require('../models/UserAccountModel');
const jwt = require('jsonwebtoken');
const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class UserAccountController {
    /**
     * Function Controller: Thêm 1 tài khoản vào hệ thống
     */
    static async InsertUserAccount(req, res) {
        try {
            await userAccountSchema.validateAsync(req.body);

            var username = req.body.username;
            var password = req.body.password;
            var createDate = currentTime;
            var userDetail_ID = req.body.userDetail_ID;
            var farm_ID = req.body.farm_ID;
            var status = req.body.status;
            var refreshtoken = generateRefreshToken(username);

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
                var result = await userAccountModel.InsertUserAccount(username, password, createDate, status, userDetail_ID, refreshtoken, farm_ID)
                if (result) {
                    var userAccount_ID = result.insertId;
                    var role_ID = req.body.role_ID;

                    var resultInsertRole = await userAccountModel.InsertRoleForUserAccount(userAccount_ID, role_ID, createDate, status);
                    if (resultInsertRole) {
                        res.status(200).json(
                            {
                                "isSuccess": true,
                                "message": `Create User Account Successfully`
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
        }
    }

    /**
     * Function Controller: Lấy toàn bộ danh sách tài khoản trong hệ thống
     */
    static async GetAllUserAccounts(req, res) {
        var result = await userAccountModel.GetAllUserAccounts();
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get All User Accounts Successfully`,
                    "data": result
                }
            );
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

    /**
     * Function Controller: Lấy thông tin tài khoản bằng ID tài khoản
     */
    static async GetUserAccountByID(req, res) {
        var id = req.params.id;

        var result = await userAccountModel.GetUserAccountByID(id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get User Account By ID Successfully`,
                    "data": result
                }
            );
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

    /**
     * Function Controller: Cập nhật tài khoản bằng ID
     */
    static async UpdateUserAccountByID(req, res) {
        try {
            await updateUserAccountSchema.validateAsync(req.body);

            var id = req.params.id;

            var password = req.body.password;
            var status = req.body.status;

            var result = await userAccountModel.UpdateUserAccountById(password, status, id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Updated User Account Successfully`
                    }
                );
            }
        } catch (error) {
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }

    /**
     * Function Controller: Xóa tài khoản bằng ID tài khoản
     */
    static async DeleteUserAccountByID(req, res) {
        try {
            var id = req.params.id;

            var result = await userAccountModel.DeleteUserAccountByID(id);
            if (result) {
                res.status(200).send("User Account deleted successfully");
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted User Account successfully`,
                    }
                );
            }
        } catch (error) {
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }
}

// Hàm tạo refresh token
function generateRefreshToken(username) {

    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    return refreshToken;
}

module.exports = UserAccountController;
