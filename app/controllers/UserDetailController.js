const userDetailModel = require('../models/UserDetailModel');

class UserDetailController {

    /**
     * Function Controller: Thêm thông tin người dùng
     */
    static async InsertUserDetail(req, res) {
        var fullname = req.body.FullName;
        var dateOfBirth = req.body.DateOfBirth;
        var gender = req.body.Gender;
        var citizenIdentification_ID = req.body.CitizenIdentification_ID;
        var addressDetail = req.body.AddressDetail;
        var email = req.body.email;
        var phone = req.body.phone;
        var Ward_ID = req.body.Ward_ID;

        var result = await userDetailModel.InsertUserDetail(fullname, dateOfBirth, gender, citizenIdentification_ID, addressDetail, phone, email, Ward_ID);
        if (result) {
            res.status(200).send("Created User Detail successfully");
        }
        else {
            res.status(400).send("Create User Detail failed");
        }
    }

    /**
     * Function Controller: Lấy toàn bộ thông tin người dùng
     */
    static async GetAllUserDetails(req, res) {
        var result = await userDetailModel.GetAllUserDetails();
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No users found");
        }
    }

    /**
     * Function Controller: Lấy thông tin chi tiết 1 người dùng
     */
    static async GetUserDetailsByID(req, res) {
        var id = req.params.id;

        var result = await userDetailModel.GetUserDetailsByID(id);
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No user detail found");
        }
    }

    /**
     * Function Controller: Lấy thông tin chi tiết 1 người dùng
     */
    static async UpdateUserDetail(req, res) {

        var fullname = req.body.FullName;
        var dateOfBirth = req.body.DateOfBirth;
        var gender = req.body.Gender;
        var citizenIdentification_ID = req.body.CitizenIdentification_ID;
        var addressDetail = req.body.AddressDetail;
        var email = req.body.email;
        var phone = req.body.phone;
        var Ward_ID = req.body.Ward_ID;

        var id = req.params.id;

        var result = await userDetailModel.UpdateUserDetailByID(fullname, dateOfBirth, gender, citizenIdentification_ID, addressDetail, phone, email, Ward_ID, id);
        if (result) {
            res.status(200).send("User Detail updated successfully");
        }
        else {
            res.status(404).send("User detail not found");
        }
    }

    /**
     * 
     * Function Controller: Xóa thông tin chi tiết 1 người dùng
     */
    static async DeleteUserDetail(req, res) {
        var id = req.params.id;

        var result = await userDetailModel.DeleteUserDetailByID(id);
        if (result) {
            res.status(204).send("User detail deleted successfully");
        }
        else {
            res.status(404).send("User detail not found");
        }
    }

}

module.exports = UserDetailController;