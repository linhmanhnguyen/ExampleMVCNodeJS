const AddressModel = require("../models/AddressModel");

class AddressController {
    /**
     * Function Controller: Lấy tất cả tỉnh thành trong database
     */
    static async GetAllProvinces(req, res) {
        try {
            var result = await AddressModel.GetAllProvinces();
            if (result.length > 0) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": "Get all provinces successfully.",
                        "data": result,
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
     * Function Controller: Lấy tất cả quận huyện trong 1 tỉnh thành
     */
    static async GetAllDistrictsByProvince(req, res) {
        try {
            var province_id = req.params.id;

            var result = await AddressModel.GetAllDistrictsByProvince(province_id);
            if (result.length > 0) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": "Get all districts successfully.",
                        "data": result,
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
     * Function Controller: Lấy tất cả phường xã trong 1 quận huyện
     */
    static async GetAllWardsByDistrict(req, res) {
        try {
            var district_id = req.params.id;

            var result = await AddressModel.GetAllWardsByDistrict(district_id);
            if (result.length > 0) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": "Get all wards successfully.",
                        "data": result,
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

module.exports = AddressController;