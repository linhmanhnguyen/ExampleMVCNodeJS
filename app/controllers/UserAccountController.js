const userAccountModel = require('../models/UserAccountModel');
const moment = require('moment-timezone');

const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class UserAccountController {
    /**
     * Function Controller: Thêm 1 tài khoản vào hệ thống
     */
    static async InsertUserAccount(req, res) {
        var username = req.body.Username;
        var password = req.body.Password;
        var createDate = currentTime;
        var userDetail_ID = req.body.UserDetail_ID;
        var farm_ID = req.body.Farm_ID;
        var status = true;

        var result = await userAccountModel.InsertUserAccount(username, password, createDate, status, userDetail_ID, "adasdasdasdas", farm_ID)
        if (result) {
            res.status(200).send("Created User Account successfully");
        }
        else {
            res.status(400).send("Create User Account failed");
        }
    }

    /**
     * Function Controller: Lấy toàn bộ danh sách tài khoản trong hệ thống
     */
    static async GetAllUserAccounts(req, res) {
        var result = await userAccountModel.GetAllUserAccounts();
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No user accounts found");
        }
    }
}

module.exports = UserAccountController;