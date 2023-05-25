const animalModel = require('../models/AnimalModel');
const historyAnimalTransferCageModel = require('../models/HistoryAnimalTransferCageModel');
const { animalSchema, updateAnimalSchema } = require('../validations/animalSchema');
const moment = require('moment-timezone');
const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class AnimalController {
    /**
     * Function Controller: Thêm 1 loại động vật
     */
    static async InsertAnimal(req, res) {
        try {
            await animalSchema.validateAsync(req.body);

            var cage_ID = req.params.cage_id;

            var type = req.body.type;
            var gender_Animal = req.body.gender_Animal;
            var weight = req.body.weight;
            var entry_Date = req.body.entry_Date;
            var status = req.body.status;

            var result = await animalModel.InsertAnimal(cage_ID, type, gender_Animal, weight, entry_Date, status);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Create Animal Successfully`
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
     * Function Controller: Lấy tất cả thông tin động vật trong 1 chuồng
     */
    static async GetAllAnimalsInCage(req, res) {

        var cage_ID = req.params.cage_id;

        var result = await animalModel.GetAllAnimalsInCage(cage_ID);
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
     * Function Controller: Lấy 1 thông tin loại động vật chuồng
     */
    static async GetAnimalByID(req, res) {
        var cage_id = req.params.cage_id;
        var animal_id = req.params.animal_id;

        var result = await animalModel.GetAnimalByID(animal_id, cage_id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get Animal By ID Successfully`,
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
     * Function Controller: Cập nhật thông tin động vật
     */
    static async UpdateAnimalByID(req, res) {
        try {
            await updateAnimalSchema.validateAsync(req.body);

            var cage_id = req.params.cage_id;
            var animal_id = req.params.animal_id;

            var type = req.body.type;
            var gender_Animal = req.body.gender_Animal;
            var weight = req.body.weight;
            var entry_Date = req.body.entry_Date;

            var result = await animalModel.UpdateAnimalByID(type, gender_Animal, weight, entry_Date, animal_id, cage_id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Updated Animal Successfully`
                    }
                );
            }
        } catch (error) {

            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                    "error": error
                }
            );
        }
    }

    /**
     * Function Controller: Xóa thông tin động vật
     */
    static async DeleteAnimalByID(req, res) {
        try {
            var cage_id = req.params.cage_id;
            var animal_id = req.params.animal_id;

            var result = await animalModel.DeleteAnimalByID(animal_id, cage_id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted animal successfully`,
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
     * Function Controller: Chuyển chuồng và ghi vào lịch sử chuyển chuồng của động vật
     */
    static async TrasnferCage(req, res) {
        try {
            var originalCage_ID = req.params.cage_id;
            var animal_id = req.params.animal_id;
            var Employee_ID = req.user.useraccount_id;

            var transferCage_ID = req.body.transferCage_ID;
            var content = req.body.content;
            var date_action = currentTime;

            var result = await animalModel.TransferCageForAnimal(transferCage_ID, animal_id);
            if (result) {
                var result_history = await historyAnimalTransferCageModel.CreateHistory(animal_id, originalCage_ID, transferCage_ID, Employee_ID, content, date_action);
                if (result_history) {
                    res.status(200).json(
                        {
                            "isSuccess": true,
                            "message": `Transfer Cage For Animal Successfully`,
                        }
                    );
                }
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
     * Function Controller: Lấy tất cả lịch sử chuyển chuồng của 1 con vật
     */
    static async GetHistoiesTransferCageOfAnimal(req, res) {
        var animal_id = req.params.animal_id;

        var result = await historyAnimalTransferCageModel.GetHistoryByAnimalID(animal_id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get History By Animal ID Successfully`,
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
     * Function Controller: Lấy 1 thông tin lịch sử chuyển chuồng cụ thể của 1 con vật
     */
    static async GetHistoryTransferCageOfAnimal(req, res) {
        var animal_id = req.params.animal_id;
        var history_id = req.params.history_id;

        var result = await historyAnimalTransferCageModel.GetHistoryByID(history_id, animal_id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get History By ID Successfully`,
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
     * Function Controller: Xóa 1 lịch sử chuyển chuồng của 1 con vật
     */
    static async DeleteHistoryTransferCageOfAnimal(req, res) {


        try {
            var animal_id = req.params.animal_id;
            var history_id = req.params.history_id;

            var result = await historyAnimalTransferCageModel.DeleteHistoryByID(history_id, animal_id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted history successfully`,
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

module.exports = AnimalController;