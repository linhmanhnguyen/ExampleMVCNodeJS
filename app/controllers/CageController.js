const farmModel = require('../models/FarmModel');
const cageModel = require('../models/CageModel');
const { cageSchema } = require('../validations/cageSchema');

class CageController {
    /**
     * Function Controller: Thêm chuồng nuôi vào trong 1 trang trại
     */
    static async InsertCage(req, res) {
        try {

            await cageSchema.validateAsync(req.body);

            var farm_ID = req.params.id;

            var cageName = req.body.cageName;
            var location = req.body.location;
            var manager_ID = req.body.manager_ID;

            var result = await cageModel.InsertCage(cageName, farm_ID, location, manager_ID);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Created Cage Successfully`
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
     * Function Controller: Lấy tất cả chuồng nuôi trong 1 trang trại
     */
    static async GetAllCagesInFarms(req, res) {
        var farm_ID = req.params.id;

        var result = await cageModel.GetAllCagesInFarm(farm_ID);
        if (result.length > 0) {
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Get All Cages In Farm Successfully`,
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
     * Function Controller: Lấy thông tin 1 chuồng nuôi trong 1 trang trại
     */
    static async GetCageByID(req, res) {
        var farm_ID = req.params.id;
        var cage_ID = req.params.cage_id;

        var result = await cageModel.GetCageByID(cage_ID, farm_ID);
        if (result.length > 0) {
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Get Cage In Farm Successfully`,
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
     * Function Controller: Cập nhật thông tin của chuồng nuôi 
     */
    static async UpdateCageByID(req, res) {

        try {

            await cageSchema.validateAsync(req.body);

            var farm_ID = req.params.id;
            var cage_ID = req.params.cage_id;

            var cageName = req.body.cageName;
            var location = req.body.location;
            var manager_ID = req.body.manager_ID;

            var result = await cageModel.UpdateCageByID(cageName, location, manager_ID, cage_ID, farm_ID);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Updated Cage Successfully`
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
     * Function Controller: Xóa thông tin chuồng nuôi trong 1 trại
     */
    static async DeleteCageByID(req, res) {
        var farm_ID = req.params.id;
        var cage_ID = req.params.cage_id;

        var result = await cageModel.DeleteCageByID(cage_ID, farm_ID);
        if (result) {
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Deleted Cage successfully`
                }
            );
        }
    }


}

module.exports = CageController;