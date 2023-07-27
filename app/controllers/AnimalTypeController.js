const animalTypeRepository = require('../repositories/AnimalTypeRepository');
const ReturnResponseUtil = require('../utils/returnResponse');

class AnimalTypeController {
    /**
     * Function Controller: Lấy toàn bộ danh sách loại động vật
     */
    static async GetAllAnimalTypes(req, res) {
        var result = await animalTypeRepository.GetAnimalTypes();
        if (result != null) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get all animal types successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }
}

module.exports = AnimalTypeController;