const userDetailModel = require('../models/UserDetailModel');
const { userDetailSchema } = require('../validations/userDetailSchema');

class UserDetailController {
    /**
     * Function Controller: Thêm thông tin người dùng
     */
    static async InsertUserDetail(req, res) {
        try {

            await userDetailSchema.validateAsync(req.body);

            var fullname = req.body.fullName;
            var dateOfBirth = req.body.dateOfBirth;
            var gender = req.body.gender;
            var citizenIdentification_ID = req.body.citizenIdentification_ID;
            var Ward_ID = req.body.ward_ID;
            var addressDetail = req.body.addressDetail;
            var email = req.body.email;
            var phone = req.body.phoneNumber;

            var CheckUserDetailExistsByCitizenIDOrPhone = await userDetailModel.CheckUserDetailExistsByCitizenIDOrPhone(citizenIdentification_ID, phone);
            if (CheckUserDetailExistsByCitizenIDOrPhone.length > 0) {
                res.status(400).json(
                    {
                        "isSuccess": false,
                        "message": `Citizen Identification ID or Phone existed`,
                    }
                );
            }
            else {
                var result = await userDetailModel.InsertUserDetail(fullname, dateOfBirth, gender, citizenIdentification_ID, Ward_ID, addressDetail, phone, email,);
                if (result) {
                    res.status(200).json(
                        {
                            "isSuccess": true,
                            "message": `Created User Detail successfully`,
                            "data": result.insertId
                        }
                    );
                }
            }

        } catch (error) {
            console.log(error);
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }

    /**
     * Function Controller: Lấy toàn bộ thông tin người dùng
     */
    static async GetAllUserDetails(req, res) {
        var result = await userDetailModel.GetAllUserDetails();
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get All User Details Successfully`,
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
     * Function Controller: Lấy thông tin chi tiết 1 người dùng
     */
    static async GetUserDetailsByID(req, res) {
        var id = req.params.id;

        var result = await userDetailModel.GetUserDetailsByID(id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get User Detail By ID Successfully`,
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
     * Function Controller: Lấy thông tin chi tiết 1 người dùng
     */
    static async UpdateUserDetail(req, res) {
        try {
            await userDetailSchema.validateAsync(req.body);

            var fullname = req.body.fullName;
            var dateOfBirth = req.body.dateOfBirth;
            var gender = req.body.gender;
            var citizenIdentification_ID = req.body.citizenIdentification_ID;
            var Ward_ID = req.body.ward_ID;
            var addressDetail = req.body.addressDetail;
            var email = req.body.email;
            var phoneNumber = req.body.phoneNumber;


            var id = req.params.id;

            var result = await userDetailModel.UpdateUserDetailByID(fullname, dateOfBirth, gender, citizenIdentification_ID, Ward_ID, addressDetail, email, phoneNumber, id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `User Detail Updated Successfully`
                    }
                );
            }
        } catch (error) {
            console.log(error);

            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }

    /**
     * 
     * Function Controller: Xóa thông tin chi tiết 1 người dùng
     */
    static async DeleteUserDetail(req, res) {
        try {
            var id = req.params.id;

            var result = await userDetailModel.DeleteUserDetailByID(id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `User detail deleted successfully`,
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

module.exports = UserDetailController;
