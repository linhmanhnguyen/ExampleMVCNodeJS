
const bcrypt = require('bcrypt');
const UserAccountModel = require('../models/UserAccountModel');
const UserDetailModel = require('../models/UserDetailModel');
const moment = require('moment-timezone');
const { registerAccountSchema } = require('../validations/userAccountSchema');
const RoleRepository = require('../repositories/RoleRepository');
const GenerateAccessToken = require('../utils/genarateAccessToken');
const ReturnResponseUtil = require('../utils/returnResponse');
const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class AuthController {
    static async Login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserAccountModel.SearchUserAccountByUsername(username);

        if (user.length > 0) {
            const checkPassword = await bcrypt.compare(password, user[0].password);
            if (!checkPassword) {
                ReturnResponseUtil.returnResponse(res, 422, false, `Password is not correct`);
            }
            else {
                if (user[0].status == true) {
                    const token = GenerateAccessToken.GenerateAccessTokenForOwnerWhenLogin(user[0].id, user[0].userDetail_id, user[0].roleName, user[0].farm_id);
                    ReturnResponseUtil.returnResponse(res, 200, true, 'Login Successful', token);
                }
                else {
                    ReturnResponseUtil.returnResponse(res, 422, false, `Account is not attivated`);
                }
            }
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, `No records found at the moment`);
        }

    }

    static async Register(req, res) {
        try {
            await registerAccountSchema.validateAsync(req.body);

            const { username, password, fullname } = req.body;
            const createDate = currentTime;
            const status = true;
            const refreshtoken = "";
            const role_ID = 2; // Chủ sở hữu

            const checkExistUsername = await UserAccountModel.CheckExistUsername(username);
            if (checkExistUsername.length > 0) {
                ReturnResponseUtil.returnResponse(res, 404, false, `Username already exists`);
            }
            else {
                const { insertId: userDetail_ID } = await UserDetailModel.InsertUserDetailWhenRegister(fullname, username);
                const { insertId: userAccount_ID } = await UserAccountModel.InsertUserAccount(username, password, createDate, userDetail_ID, refreshtoken);
                await UserAccountModel.InsertRoleForUserAccount(userAccount_ID, role_ID, createDate, status);
                const role = await RoleRepository.GetRoleByID(role_ID);
                const accesstoken = GenerateAccessToken.GenerateAccessTokenForOwner(userAccount_ID, userDetail_ID, role.roleName);

                ReturnResponseUtil.returnResponse(res, 200, true, `Register Successfully`, accesstoken);
            }

        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, `An error has occurred, please try again`);
        }
    }

    static async CheckExistUsername(req, res) {
        const username = req.params.username;
        const checkExistUsername = await UserAccountModel.CheckExistUsername(username);
        if (checkExistUsername.length > 0) {
            ReturnResponseUtil.returnResponse(res, 400, false, `Username already exists`);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 200, true, `Username does not exist`);
        }
    }
}

module.exports = AuthController;
