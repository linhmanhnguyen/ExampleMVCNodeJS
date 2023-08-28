const CageRepository = require('../repositories/CageRepository');
const { insertCageSchema } = require('../validations/cageSchema');
const ReturnResponseUtil = require('../utils/returnResponse');
const { parse } = require('date-fns');
const HistoryCageEntryRepository = require('../repositories/HistoryCageEntryRepository');
const HistoryCageEntryDetailRepository = require('../repositories/HistoryCageEntryDetailRepository');
const moment = require('moment-timezone');
const AnimalRepository = require('../repositories/AnimalRepository');
const UserAccountRepository = require('../repositories/UserAccountRepository');
const EventRepository = require('../repositories/EventRepository');
var currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

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

            await insertCageSchema.validateAsync({
                livestockStaff_id: req.body.username,
                veterinaryStaff_id: req.body.password,

            });


            var farm_ID = req.params.id;
            var user_id = req.user.userAccount_ID;

            // Properties để thêm nhân viên vào chuồng đó
            var livestockStaff_id = req.body.livestockStaff_id;
            var veterinaryStaff_id = req.body.veterinaryStaff_id;

            // Ngày nhập chuồng
            var dateEntryCage = req.body.dateEntryCage;
            const dateObject = parse(dateEntryCage, 'dd-MM-yyyy', new Date());      // Convert string to date
            const endDate = new Date(dateObject);

            // Thêm 5 tháng vào ngày kết thúc
            endDate.setMonth(endDate.getMonth() + 5);

            var numberOfAnimalsInCage = req.body.numberOfAnimalsInCage;
            var totalWeight = req.body.totalWeight;

            var dateAction = currentTime;

            var resultInsertCage = await CageRepository.InsertCage('test', farm_ID, 9);
            if (resultInsertCage) {
                var cage_id = resultInsertCage.insertId;

                if (parseInt(livestockStaff_id) == parseInt(veterinaryStaff_id)) {
                    await UserAccountRepository.InsertUserAccountToCage(livestockStaff_id, cage_id, dateAction, true, true, true, dateAction);
                } else if (parseInt(livestockStaff_id) != parseInt(veterinaryStaff_id)) {
                    await UserAccountRepository.InsertUserAccountToCage(livestockStaff_id, cage_id, dateAction, true, false, true, dateAction);
                    await UserAccountRepository.InsertUserAccountToCage(veterinaryStaff_id, cage_id, dateAction, false, true, true, dateAction);
                }

                if (dateObject != null && numberOfAnimalsInCage != "" && totalWeight != "") {
                    var resultInsertEvent = await EventRepository.CreateEvent(dateObject, endDate.toISOString().split('T')[0]);
                    const event_id = resultInsertEvent.insertId;

                    var weightOfAnimal = parseInt(totalWeight) / parseInt(numberOfAnimalsInCage);

                    var resultInsertHistoryEntryCage = await HistoryCageEntryRepository.InsertHistory(user_id, farm_ID, numberOfAnimalsInCage, weightOfAnimal, dateAction, event_id);
                    await HistoryCageEntryDetailRepository.InsertHistory(cage_id, numberOfAnimalsInCage, resultInsertHistoryEntryCage.insertId)

                    for (let i = 0; i < numberOfAnimalsInCage; i++) {
                        await AnimalRepository.InsertAnimal(cage_id, "test", "male", weightOfAnimal, dateAction, "normal");
                    }
                }

                ReturnResponseUtil.returnResponse(res, 200, true, 'Created cage successfully');
            }
        } catch (error) {
            console.log(error);
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