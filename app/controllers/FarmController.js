const farmModel = require('../models/FarmModel')
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

            var farmName = req.body.farmName;
            var createDate = currentTime;
            var status = req.body.status;
            var animalType_ID = req.body.animalType_ID;
            var animalDensity = req.body.animalDensity;
            var ward_ID = req.body.ward_ID;
            var addressDetail = req.body.addressDetail;
            var lastModified = currentTime;

            var result = await farmModel.InsertFarm(farmName, createDate, status, animalType_ID, animalDensity, ward_ID, addressDetail, lastModified);

            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Created Farm successfully`
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
        var result = await farmModel.GetAllFarms();
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

}

module.exports = FarmController;