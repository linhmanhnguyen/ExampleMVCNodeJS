const UserAccountRepository = require('../repositories/UserAccountRepository');
const moment = require('moment-timezone');
const { userAccountSchema, updateUserAccountSchema } = require('../validations/userAccountSchema');

const jwt = require('jsonwebtoken');
const ReturnResponseUtil = require('../utils/returnResponse');
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
            var status = req.body.status;
            var refreshtoken = generateRefreshToken(username);
            var role_ID = req.body.role_ID;

            var searchUserAccount = await UserAccountRepository.SearchUserAccountByUsername(username);
            if (searchUserAccount.length > 0) {
                ReturnResponseUtil.returnResponse(res, 400, false, 'Username existed');
            }
            else {
                var result = await UserAccountRepository.InsertUserAccount(username, password, createDate, userDetail_ID, refreshtoken)
                if (result) {
                    var userAccount_ID = result.insertId;

                    var resultInsertRole = await UserAccountRepository.InsertRoleForUserAccount(userAccount_ID, role_ID, createDate, status);
                    if (resultInsertRole) {
                        ReturnResponseUtil.returnResponse(res, 200, true, 'Create User Account Successfully', userAccount_ID);
                    }
                    else {
                        ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
                    }
                }
                else {
                    ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
                }
            }

        } catch (error) {
            // console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Lấy toàn bộ danh sách tài khoản trong hệ thống
     */
    static async GetAllUserAccounts(req, res) {
        var result = await UserAccountRepository.GetAllUserAccounts();
        if (result.length > 0) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get All User Accounts Successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller: Lấy thông tin tài khoản bằng ID tài khoản
     */
    static async GetUserAccountByID(req, res) {
        var id = req.params.id;

        var result = await UserAccountRepository.GetUserAccountByID(id);
        if (result.length > 0) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get User Account By ID Successfully');
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
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

            var result = await UserAccountRepository.UpdateUserAccountById(password, id);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Updated User Account Successfully');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Xóa tài khoản bằng ID tài khoản
     */
    static async DeleteUserAccountByID(req, res) {
        try {
            var id = req.params.id;

            var result = await UserAccountRepository.DeleteUserAccountByID(id);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Deleted User Account successfully');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }
}

// Hàm tạo refresh token
function generateRefreshToken(username) {

    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    return refreshToken;
}

module.exports = UserAccountController;
