const animalTypeModel = require('../models/AnimalTypeModel');
const { animalTypeSchema } = require('../validations/animalTypeSchema');

class AnimalTypeController {
    /**
     * Function Controller: Thêm 1 loại động vật
     */
    static async InsertAnimalType(req, res) {
        try {

            await animalTypeSchema.validateAsync(req.body);

            var typeName = req.body.typeName;

            var result = await animalTypeModel.InsertAnimalType(typeName);
            if (result) {
                res.status(200).send("Created Animal Type successfully");
            }
            else {
                res.status(400).send("Create Animal Type failed");
            }
        } catch (error) {
            res.status(400).json({ error: error.details });
        }

    }

    /**
     * Function Controller: Lấy toàn bộ danh sách loại động vật
     */
    static async GetAllAnimalTypes(req, res) {
        var result = await animalTypeModel.GetAnimalTypes();
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No animal types found");
        }
    }

    /**
     * Function Controller: Lấy 1 thông tin loại động vật bằng ID
     */
    static async GetAnimalTypesByID(req, res) {
        var id = req.params.id;

        var result = await animalTypeModel.GetAnimalTypesById(id);
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No animal types found");
        }
    }

    /**
     * Function Controller: Cập nhật thông tin loại động vật
     */
    static async UpdateAnimalTypeByID(req, res) {
        try {

            await animalTypeSchema.validateAsync(req.body);

            var id = req.params.id;

            var typeName = req.body.typeName;
            var result = await animalTypeModel.UpdateAnimalTypeById(typeName, id);
            if (result) {
                res.status(200).send("Animal Type updated successfully");
            }
            else {
                res.status(404).send("Animal Type not found");
            }
        } catch (error) {
            res.status(400).json({ error: error.details });
        }


    }

    /**
     * Function Controller: Xóa thông tin loại động vật
     */
    static async DeleteAnimalTypeByID(req, res) {
        var id = req.params.id;

        var result = await animalTypeModel.DeleteAnimalTypeByID(id);
        if (result) {
            res.status(200).send("Animal Type deleted successfully");
        }
        else {
            res.status(404).send("Animal Type not found");
        }
    }
}

module.exports = AnimalTypeController;