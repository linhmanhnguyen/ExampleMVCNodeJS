const animalModel = require('../models/AnimalModel');
const historyAnimalTransferCageModel = require('../models/HistoryAnimalTransferCageModel');
const historyAnimalDeath = require('../models/HistoryAnimalDeathModel');
const historyAnimalWeight = require('../models/HistoryAnimalWeightModel');

const { animalSchema, updateAnimalSchema } = require('../validations/animalSchema');
const { historyAnimalTransferCageSchema } = require('../validations/historyAnimalTransferCageSchema');
const { historyAnimalDeathSchema } = require('../validations/historyAnimalDeathSchema');
const { historyAnimalWeightSchema } = require('../validations/historyAnimalWeightSchema');

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
            var entry_Date = currentTime;
            var status = req.body.status;

            var result = await animalModel.InsertAnimal(cage_ID, type, gender_Animal, weight, entry_Date, status);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Create Animal Successfully`,
                        "data": result.insertId
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
        var animal_id = req.params.id;

        var result = await animalModel.GetAnimalByID(animal_id);
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

            var animal_id = req.params.id;

            var type = req.body.type;
            var gender_Animal = req.body.gender_Animal;
            var weight = req.body.weight;
            var entry_Date = req.body.entry_Date;

            var result = await animalModel.UpdateAnimalByID(type, gender_Animal, weight, entry_Date, animal_id);
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
            var animal_id = req.params.id;

            var result = await animalModel.DeleteAnimalByID(animal_id);
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
            await historyAnimalTransferCageSchema.validateAsync(req.body);

            var animal_id = req.params.id;
            var Employee_ID = req.user.userAccount_ID;

            var animal = await animalModel.GetAnimalByID(animal_id);
            if (animal.length > 0) {
                var originalCage_ID = animal[0].Cage_ID;

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
     * Function Controller: Lấy tất cả lịch sử chuyển chuồng của 1 con vật
     */
    static async GetHistoiesTransferCageOfAnimal(req, res) {
        var animal_id = req.params.id;

        var result = await historyAnimalTransferCageModel.GetHistoryByAnimalID(animal_id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get History Transfer Cage Of Animal Successfully`,
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
        var animal_id = req.params.id;
        var history_id = req.params.history_id;

        var result = await historyAnimalTransferCageModel.GetHistoryByID(history_id, animal_id);
        if (result.length > 0) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get History Transfer Cage By ID Successfully`,
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
            var animal_id = req.params.id;
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

    /**
 * Function Controller: Xóa 1 lịch sử chuyển chuồng của 1 con vật
 */
    static async DeleteHistoriesTransferCageOfAnimal(req, res) {
        try {
            var animal_id = req.params.id;

            var result = await historyAnimalTransferCageModel.DeleteHistoriesOfAnimal(animal_id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted histories animal transfer cage successfully`,
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
     * Function Controller: Thêm lịch sử khi động vật chết
     */
    static async InsertHistoryWhenAnimalDie(req, res) {
        try {

            await historyAnimalDeathSchema.validateAsync(req.body);

            var animal_id = req.params.id;
            var employee_id = req.user.userAccount_ID;

            var status = req.body.status;
            var type_Cause = req.body.type_Cause;
            var reason = req.body.reason;
            var date_occursion = currentTime;

            var result = await animalModel.UpdateStatusOfAnimal(status, animal_id);
            if (result) {
                var result_history = historyAnimalDeath.InsertHistory(animal_id, employee_id, type_Cause, reason, date_occursion);
                if (result_history) {
                    res.status(200).json(
                        {
                            "isSuccess": true,
                            "message": `Inserted history animal death successfully.`,
                        }
                    )
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
     * Function Controller: Xem lịch sử tử hẹo của động vật
     */
    static async GetHistoryAnimalDeath(req, res) {
        var animal_id = req.params.id;

        var result = await historyAnimalDeath.GetHistoryOfAnimal(animal_id);
        if (result.length > 0) {
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Get History Animal Death Successfully`,
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
     * Function Controller: Xóa lịch sử tử hẹo của động vật
     */
    static async DeleteHistoryAnimalDeath(req, res) {
        try {
            var animal_id = req.params.id;
            var result = await historyAnimalDeath.DeleteHistory(animal_id);

            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted History Animal Death Successfully.`,
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
     * Function Controller: Thêm lịch sử cân cho động vật
     */
    static async InsertHistoryAnimalWeight(req, res) {
        try {
            await historyAnimalWeightSchema.validateAsync(req.body);

            var animal_id = req.params.id;
            var employee_id = req.user.userAccount_ID;

            var weight = req.body.weight;
            var type_action = req.body.typeAction;
            var content = req.body.content;
            var date_action = currentTime;

            var result = await historyAnimalWeight.InsertHistory(type_action, animal_id, employee_id, weight, content, date_action);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Inserted history animal weight successfully.`,
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
     * Function Controller: Lấy các lịch sử ghi chép của 1 động vật
     */
    static async GetHistoriesAnimalWeight(req, res) {
        var animal_id = req.params.id;

        var result = await historyAnimalWeight.GetHistoriesOfAnimal(animal_id);
        if (result.length > 0) {
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Get History Animal Weight Successfully`,
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
     * Function Controller: Xem 1 lịch sử cân nặng chi tiết của 1 động vật
     */
    static async GetHistoryAnimalWeight(req, res) {
        var animal_id = req.params.id;
        var history_id = req.params.history_id;

        var result = await historyAnimalWeight.GetHistoryOfAnimal(history_id, animal_id);
        if (result.length > 0) {
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Get History Animal Weight Successfully`,
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
     * Function Controller: Xóa 1 lịch sử cân của 1 động vật
     */
    static async DeleteHistoryAnimalWeight(req, res) {
        try {
            var animal_id = req.params.id;
            var history_id = req.params.history_id;
            var result = await historyAnimalWeight.DeleteHistoryOfAnimal(history_id, animal_id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted history animal weight successfully.`,
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
     * Function Controller: Xóa 1 lịch sử cân của 1 động vật
     */
    static async DeleteHistoriesAnimalWeight(req, res) {
        try {
            var animal_id = req.params.id;

            var result = await historyAnimalWeight.DeleteHistoriesOfAnimal(animal_id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted history animal weight successfully.`,
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