const farmModel = require('../models/FarmModel')

class FarmController {

    /**
     * Function Controller: Lấy danh sách trang trại trong hệ thống hoặc theo chủ sở hữu
     */
    static async GetAllFarms(req, res) {
        if (req.query.hasOwnProperty('owner_ID')) {

            var owner_ID = req.query.owner_ID;

            var result = await farmModel.GetFarmsByOwnerID(owner_ID);
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.status(404).send("No farms found");
            }
        }

        else {
            var result = await farmModel.GetAllFarms();
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.status(404).send("No farms found");
            }
        }
    }

    /**
     * Function Controller: Thêm 1 trang trại vào hệ thống
     */
    static async InsertFarm(req, res) {
        var farm_name = req.body.farm_name;
        var address = req.body.address;
        var date_created = req.body.date_created;
        var owner_ID = req.body.owner_ID;

        var result = await farmModel.InsertFarm(farm_name, address, date_created, owner_ID);

        if (result) {
            res.status(200).send("Created User successfully");
        }
        else {
            res.status(400).send("Create User failed");
        }
    }


    /**
     * Function Controller: Lấy thông tin trang trại bằng ID của trang trại
     */
    static async GetFarmByID(req, res) {
        var id = req.params.id;

        var result = await farmModel.GetFarmByID(id);
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No farm found");
        }
    }

    /**
     * Function Controller: Cập nhật thông tin của trang trại
     */
    static async UpdateFarm(req, res) {
        var id = req.params.id;

        var farm_name = req.body.farm_name;
        var address = req.body.address;
        var date_created = req.body.date_created;

        var result = await farmModel.UpdateFarm(farm_name, address, date_created, id);
        if (result) {
            res.status(200).send("Updated Farm successfully");
        }
        else {
            res.status(400).send("Update Farm failed");
        }
    }

    /**
     * Function Controller: Xóa trang trại
     */
    static async DeleteFarm(req, res) {
        var id = req.params.id;

        var result = await farmModel.DeleteFarm(id);
        if (result) {
            res.status(200).send("Deleted Farm successfully");
        }
        else {
            res.status(400).send("Delete Farm failed");
        }

    }

}

module.exports = FarmController;