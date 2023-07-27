const UserDetailRepository = require('../repositories/UserDetailRepository');
const ReturnResponseUtil = require('../utils/returnResponse');
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

            var CheckUserDetailExistsByCitizenIDOrPhone = await UserDetailRepository.CheckUserDetailExistsByCitizenIDOrPhone(citizenIdentification_ID, phone);
            if (CheckUserDetailExistsByCitizenIDOrPhone.length > 0) {
                ReturnResponseUtil.returnResponse(res, 400, false, 'Citizen Identification ID or Phone existed');
            }
            else {
                var result = await UserDetailRepository.InsertUserDetail(fullname, dateOfBirth, gender, citizenIdentification_ID, Ward_ID, addressDetail, phone, email,);
                if (result) {
                    ReturnResponseUtil.returnResponse(res, 200, true, 'Created User Detail successfully', result.insertId);
                }
            }

        } catch (error) {
            // console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');

        }
    }

    /**
     * Function Controller: Lấy toàn bộ thông tin người dùng
     */
    static async GetAllUserDetails(req, res) {
        var result = await UserDetailRepository.GetAllUserDetails();
        if (result.length > 0) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get All User Details Successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller: Lấy thông tin chi tiết 1 người dùng
     */
    static async GetUserDetailsByID(req, res) {
        var id = req.params.id;

        var result = await UserDetailRepository.GetUserDetailsByID(id);
        if (result.length > 0) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get User Detail By ID Successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
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

            var result = await UserDetailRepository.UpdateUserDetailByID(fullname, dateOfBirth, gender, citizenIdentification_ID, Ward_ID, addressDetail, email, phoneNumber, id);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'User Detail Updated Successfully');
            }
        } catch (error) {
            // console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * 
     * Function Controller: Xóa thông tin chi tiết 1 người dùng
     */
    static async DeleteUserDetail(req, res) {
        try {
            var id = req.params.id;

            var result = await UserDetailRepository.DeleteUserDetailByID(id);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'User detail deleted successfully');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

}

module.exports = UserDetailController;
