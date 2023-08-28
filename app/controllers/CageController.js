const CageRepository = require('../repositories/CageRepository');
const { cageSchema } = require('../validations/cageSchema');
const ReturnResponseUtil = require('../utils/returnResponse');
const { parse } = require('date-fns');

class CageController {

    /**
     * Function Controller: Thêm nhiều chuồng vào trong 1 trang trại
     */
    static async InsertMultipleCages(req, res) {
        try {
            const farm_ID = req.params.id;
            const numberOfCages = req.body.numberOfCages;

            for (let index = 0; index < numberOfCages; index++) {
                var cageName = `Cage ${index + 1}`;
                var location = index + 1;

                await CageRepository.InsertCage(cageName, farm_ID, location);
            }

            ReturnResponseUtil.returnResponse(res, 200, true, `Created ${numberOfCages} cages successfully`);

        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Thêm chuồng nuôi vào trong 1 trang trại
     */
    static async InsertCage(req, res) {
        try {

            // await cageSchema.validateAsync(req.body);

            var farm_ID = req.params.id;

            // var cageName = req.body.cageName;
            // var location = req.body.location;
            // var manager_ID = req.body.manager_ID;

            // Properties để thêm nhân viên vào chuồng đó
            var livestockStaff_id = req.body.livestockStaff_id;
            var veterinaryStaff_id = req.body.veterinaryStaff_id;

            // Ngày nhập chuồng
            var dateEntryCage = req.body.dateEntryCage;
            const dateObject = parse(dateEntryCage, 'dd-MM-yyyy', new Date());

            console.log(dateObject);

            var numberOfAnimalsInCage = req.body.numberOfAnimalsInCage;
            var totalWeight = req.body.totalWeight;

            // console.log(livestockStaff_id);
            // console.log(veterinaryStaff_id);

            console.log(dateEntryCage);
            // console.log(numberOfAnimalsInCage);
            // console.log(totalWeight);

            // var result = await CageRepository.InsertCage(cageName, farm_ID, location, manager_ID);
            // if (result) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Created cage successfully');
            // }
        } catch (error) {
            // console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Lấy tất cả chuồng nuôi trong 1 trang trại
     */
    static async GetAllCagesInFarms(req, res) {
        var farm_ID = req.params.id;

        var result = await CageRepository.GetAllCagesInFarm(farm_ID);
        if (result.length > 0) {
            ReturnResponseUtil.returnResponse(res, 200, true, `Get all cages in farm successfully`, result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, `No records found at the moment`);
        }
    }

    /**
     * Function Controller: Lấy thông tin 1 chuồng nuôi trong 1 trang trại
     */
    static async GetCageByID(req, res) {
        var farm_ID = req.params.id;
        var cage_ID = req.params.cage_id;

        var result = await CageRepository.GetCageByID(cage_ID, farm_ID);
        if (result.length > 0) {
            ReturnResponseUtil.returnResponse(res, 200, true, `Get Cage In Farm Successfully`, result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, `No records found at the moment`);
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

            var result = await CageRepository.UpdateCageByID(cageName, location, manager_ID, cage_ID, farm_ID);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, `Updated Cage Successfully`);
            }

        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, `An error has occurred, please try again`);
        }
    }

    /**
     * Function Controller: Xóa thông tin chuồng nuôi trong 1 trại
     */
    static async DeleteCageByID(req, res) {
        var farm_ID = req.params.id;
        var cage_ID = req.params.cage_id;

        var result = await CageRepository.DeleteCageByID(cage_ID, farm_ID);
        if (result) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Deleted Cage successfully');
        }
    }

}

module.exports = CageController;