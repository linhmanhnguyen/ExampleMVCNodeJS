const animalTypeRepository = require('../repositories/AnimalTypeRepository');
// const { animalTypeSchema } = require('../validations/animalTypeSchema');

class AnimalTypeController {
    /**
     * Function Controller: Thêm 1 loại động vật
     */
    // static async InsertAnimalType(req, res) {
    //     try {

    //         await animalTypeSchema.validateAsync(req.body);

    //         var typeName = req.body.typeName;

    //         var result = await animalTypeRepository.InsertAnimalType(typeName);
    //         if (result) {
    //             res.status(200).json(
    //                 {
    //                     "isSuccess": true,
    //                     "message": `Create Animal Type Successfully`,
    //                     "data": result.insertId
    //                 }
    //             );
    //         }

    //     } catch (error) {
    //         res.status(400).json(
    //             {
    //                 "isSuccess": false,
    //                 "message": `An error has occurred, please try again.`,
    //             }
    //         );
    //     }
    // }

    /**
     * Function Controller: Lấy toàn bộ danh sách loại động vật
     */
    static async GetAllAnimalTypes(req, res) {
        var result = await animalTypeRepository.GetAnimalTypes();
        if (result != null) {
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

    // /**
    //  * Function Controller: Lấy 1 thông tin loại động vật bằng ID
    //  */
    // static async GetAnimalTypesByID(req, res) {
    //     var id = req.params.id;

    //     var result = await animalTypeRepository.GetAnimalTypesById(id);
    //     if (result.length > 0) {
    //         res.json(
    //             {
    //                 "isSuccess": true,
    //                 "message": `Get Animal Type By ID Successfully`,
    //                 "data": result
    //             }
    //         );
    //     }
    //     else {
    //         res.status(404).json(
    //             {
    //                 "isSuccess": false,
    //                 "message": `No records found at the moment.`,
    //             }
    //         );
    //     }
    // }

    // /**
    //  * Function Controller: Cập nhật thông tin loại động vật
    //  */
    // static async UpdateAnimalTypeByID(req, res) {
    //     try {
    //         await animalTypeSchema.validateAsync(req.body);

    //         var id = req.params.id;

    //         var typeName = req.body.typeName;
    //         var result = await animalTypeRepository.UpdateAnimalTypeById(typeName, id);
    //         if (result) {
    //             res.status(200).json(
    //                 {
    //                     "isSuccess": true,
    //                     "message": `Animal Type Updated Successfully`
    //                 }
    //             );
    //         }
    //     } catch (error) {
    //         res.status(400).json(
    //             {
    //                 "isSuccess": false,
    //                 "message": `An error has occurred, please try again.`,
    //             }
    //         );
    //     }
    // }

    // /**
    //  * Function Controller: Xóa thông tin loại động vật
    //  */
    // static async DeleteAnimalTypeByID(req, res) {
    //     try {
    //         var id = req.params.id;

    //         var result = await animalTypeRepository.DeleteAnimalTypeByID(id);
    //         if (result) {
    //             res.status(200).json(
    //                 {
    //                     "isSuccess": true,
    //                     "message": `Animal Type deleted successfully`,
    //                 }
    //             );
    //         }
    //     } catch (error) {
    //         res.status(400).json(
    //             {
    //                 "isSuccess": false,
    //                 "message": `An error has occurred, please try again.`,
    //             }
    //         );
    //     }
    // }
}

module.exports = AnimalTypeController;