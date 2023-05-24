const animalModel = require('../models/AnimalModel');
const { animalSchema } = require('../validations/animalSchema');

class AnimalController {
    /**
     * Function Controller: Thêm 1 loại động vật
     */
    static async InsertAnimal(req, res) {
        try {
            await animalSchema.validateAsync(req.body);

            var cage_ID = req.params.cage_id;

            var gender_Animal = req.body.gender_Animal;
            var weight = req.body.weight;
            var entry_Date = req.body.entry_Date;
            var status = req.body.status;

            var result = await animalModel.InsertAnimal(cage_ID, gender_Animal, weight, entry_Date, status);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Create Animal Successfully`
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
            await animalSchema.validateAsync(req.body);

            var cage_id = req.params.cage_id;
            var animal_id = req.params.animal_id;

            var gender_Animal = req.body.gender_Animal;
            var weight = req.body.weight;
            var entry_Date = req.body.entry_Date;
            var status = req.body.status;

            var result = await animalModel.UpdateAnimalByID(gender_Animal, weight, entry_Date, status, animal_id, cage_id);
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

}

module.exports = AnimalController;