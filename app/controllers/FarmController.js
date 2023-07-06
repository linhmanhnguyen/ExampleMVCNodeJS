const farmModel = require('../models/FarmModel')
const userAccountModel = require('../models/UserAccountModel')
const moment = require('moment-timezone');
const { farmSchema } = require('../validations/farmSchema');

const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class FarmController {

    /**
     * Function Controller: Thêm 1 trang trại vào hệ thống
     */
    static async InsertFarm(req, res) {
        try {

            await farmSchema.validateAsync(req.body);

            const farmName = req.body.farmName;
            const animalType_ID = req.body.animalType_ID;
            const animalDensity = req.body.animalDensity;
            const ward_ID = req.body.ward_ID;
            const addressDetail = req.body.addressDetail;
            const status = true;

            const lastModified = currentTime;
            const createDate = currentTime;
            const result = await farmModel.InsertFarm(farmName, createDate, status, animalType_ID, animalDensity, ward_ID, addressDetail, lastModified);

            if (result) {
                const farm_ID = result.insertId;
                const user_ID = req.user.useraccount_id;

                // Dựa theo tài khoản đang thực hiện, gán thông tin tài khoản đó vào trong farm vừa tạo
                await userAccountModel.InsertUserAccountToFarm(user_ID, farm_ID, createDate, status);

                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Created Farm successfully`,
                        "data": farm_ID
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
     * Function Controller: Lấy toàn bộ danh sách trang trại
     */
    static async GetAllFarms(req, res) {

        var useraccount_id = req.user.useraccount_id;

        var result = await farmModel.GetAllFarms(useraccount_id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get All Animal Types Successfully`,
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
     * Function Controller: Lấy thông tin trang trại bằng ID
     */
    static async GetFarmByID(req, res) {
        var id = req.params.id;

        var result = await farmModel.GetFarmByID(id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get Farm Successfully`,
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
     * Function Controller: Cập nhật thông tin của trang trại
     */
    static async UpdateFarmByID(req, res) {
        try {
            await farmSchema.validateAsync(req.body);

            var farmName = req.body.farmName;
            var status = req.body.status;
            var animalType_ID = req.body.animalType_ID;
            var animalDensity = req.body.animalDensity;
            var ward_ID = req.body.ward_ID;
            var addressDetail = req.body.addressDetail;
            var lastModified = currentTime;

            var id = req.params.id;
            var result = await farmModel.UpdateFarmByID(farmName, status, animalType_ID, animalDensity, ward_ID, addressDetail, lastModified, id);

            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Farm Updated Successfully`
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
     * Function Controller: Xóa trang trại
     */
    static async DeleteFarm(req, res) {
        try {
            var id = req.params.id;

            var result = await farmModel.DeleteFarm(id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted Farm successfully`,
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
     * Function Controller: Thêm nhân viên hoặc quản lý vào trang trại
     */
    static InsertMultipleUserToFarm(req, res) {
        try {
            const farm_id = req.params.id;

            const users = req.body.users;
            console.log(typeof (users));
            users = JSON.parse(users);
            console.log(typeof (users));

            for (let index = 0; index < users.length; index++) {
                console.log(users[index].fullName);
            }

            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Insert Multiple User To Farm Successfully`,
                    "data": users
                }
            )

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
}

module.exports = FarmController;
