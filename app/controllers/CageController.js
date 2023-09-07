const CageRepository = require("../repositories/CageRepository");
const { insertCageSchema } = require("../validations/cageSchema");
const ReturnResponseUtil = require("../utils/returnResponse");
const { parse } = require("date-fns");
const HistoryCageEntryRepository = require("../repositories/HistoryCageEntryRepository");
const HistoryCageEntryDetailRepository = require("../repositories/HistoryCageEntryDetailRepository");
const moment = require("moment-timezone");
const AnimalRepository = require("../repositories/AnimalRepository");
const UserAccountRepository = require("../repositories/UserAccountRepository");
const EventRepository = require("../repositories/EventRepository");
var currentTime = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD_HH-mm-ss");

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

      ReturnResponseUtil.returnResponse(
        res,
        200,
        true,
        `Created ${numberOfCages} cages successfully`
      );
    } catch (error) {
      ReturnResponseUtil.returnResponse(
        res,
        400,
        false,
        "An error has occurred, please try again"
      );
    }
  }

  /**
   * Function Controller: Thêm chuồng nuôi vào trong 1 trang trại
   */
  static async InsertCage(req, res) {
    try {
      await insertCageSchema.validateAsync({
        livestockStaff_id: req.body.livestockStaff_id,
        veterinaryStaff_id: req.body.veterinaryStaff_id,
      });

      var farm_ID = req.params.id;
      var user_id = req.user.userAccount_ID;

      // Properties để thêm nhân viên vào chuồng đó
      var livestockStaff_id = req.body.livestockStaff_id;
      var veterinaryStaff_id = req.body.veterinaryStaff_id;

      // Ngày nhập chuồng
      var dateEntryCage = req.body.dateEntryCage;
      const dateObject = parse(dateEntryCage, "dd-MM-yyyy", new Date()); // Convert string to date
      const endDate = new Date(dateObject);

      // Thêm 5 tháng vào ngày kết thúc
      endDate.setMonth(endDate.getMonth() + 5);

      var numberOfAnimalsInCage = req.body.numberOfAnimalsInCage;
      var totalWeight = req.body.totalWeight;

      var dateAction = currentTime;

      var resultInsertCage = await CageRepository.InsertCage(
        "test",
        farm_ID,
        9
      );
      if (resultInsertCage) {
        var cage_id = resultInsertCage.insertId;

        if (parseInt(livestockStaff_id) == parseInt(veterinaryStaff_id)) {
          await CageRepository.InsertStaffToCage(
            livestockStaff_id,
            cage_id,
            dateAction,
            true,
            true,
            true,
            dateAction
          );
        } else if (
          parseInt(livestockStaff_id) != parseInt(veterinaryStaff_id)
        ) {
          await CageRepository.InsertStaffToCage(
            livestockStaff_id,
            cage_id,
            dateAction,
            true,
            false,
            true,
            dateAction
          );
          await CageRepository.InsertStaffToCage(
            veterinaryStaff_id,
            cage_id,
            dateAction,
            false,
            true,
            true,
            dateAction
          );
        }

        if (
          dateObject != null &&
          numberOfAnimalsInCage != "" &&
          totalWeight != ""
        ) {
          var resultInsertEvent = await EventRepository.CreateEvent(
            dateObject,
            endDate.toISOString().split("T")[0]
          );
          const event_id = resultInsertEvent.insertId;

          var weightOfAnimal =
            parseInt(totalWeight) / parseInt(numberOfAnimalsInCage);

          var resultInsertHistoryEntryCage =
            await HistoryCageEntryRepository.InsertHistory(
              user_id,
              farm_ID,
              numberOfAnimalsInCage,
              weightOfAnimal,
              dateAction,
              event_id
            );
          await HistoryCageEntryDetailRepository.InsertHistory(
            cage_id,
            numberOfAnimalsInCage,
            resultInsertHistoryEntryCage.insertId
          );

          for (let i = 0; i < numberOfAnimalsInCage; i++) {
            await AnimalRepository.InsertAnimal(
              cage_id,
              "test",
              "male",
              weightOfAnimal,
              dateAction,
              "normal"
            );
          }
        }

        ReturnResponseUtil.returnResponse(
          res,
          200,
          true,
          "Created cage successfully"
        );
      }
    } catch (error) {
      console.log(error);
      ReturnResponseUtil.returnResponse(
        res,
        400,
        false,
        "An error has occurred, please try again"
      );
    }
  }

  /**
   * Function Controller: Lấy thông tin 1 chuồng nuôi trong 1 trang trại
   */
  static async GetCageByID(req, res) {
    var cage_ID = req.params.id;

    var result = await CageRepository.GetCageByID(cage_ID);
    if (result != null) {
      ReturnResponseUtil.returnResponse(
        res,
        200,
        true,
        `Get Cage In Farm Successfully`,
        result
      );
    } else {
      ReturnResponseUtil.returnResponse(
        res,
        404,
        false,
        `No records found at the moment`
      );
    }
  }

  /**
   * Function Controller: Cập nhật nhân việt trong chuồng nuôi
   */
  static async UpdateCageByID(req, res) {
    try {
      // await cageSchema.validateAsync(req.body);

      var cage_ID = req.params.id;
      var livestockStaff_id = req.body.livestockStaff_id;
      var veterinaryStaff_id = req.body.veterinaryStaff_id;
      var lastModified = currentTime;

      // 1. Tạm thời truy vấn nhân viên chăm sóc và nhân viên kỹ thuật trong chuồng
      await CageRepository.DisableEmployeeInCage(cage_ID, lastModified);

      // 2.1. Kiểm tra xem nhân viên chăm sóc và nhân viên kỹ thuật có cùng 1 ID không? (Trường hợp khác ID)
      if (parseInt(livestockStaff_id) != parseInt(veterinaryStaff_id)) {
        // 2.1.1. Tìm ID nhân viên để chuyển thành nhân viên chăm sóc
        const resultLivestockStaffInCage =
          await CageRepository.SearchEmployeeInCage(cage_ID, livestockStaff_id);
        // 2.1.1.1. Đã có ID nhân viên trong chuồng rồi
        if (resultLivestockStaffInCage.length > 0) {
          await CageRepository.UpdateStaffInCage(
            cage_ID,
            livestockStaff_id,
            true,
            false,
            lastModified
          );
        } 
        // 2.1.1.2. ID nhân viên chưa tồn tại trong chuồng
        else {
          await CageRepository.InsertStaffToCage(livestockStaff_id, cage_ID, lastModified, true, false, true, lastModified);
        }

        // 2.1.2. Tìm ID nhân viên để chuyển thành nhân viên kỹ thuật
        const resultVeterinaryStaffInCage =
          await CageRepository.SearchEmployeeInCage(
            cage_ID,
            veterinaryStaff_id
          );
        // 2.1.2.1. Đã có ID nhân viên trong chuồng rồi
        if (resultVeterinaryStaffInCage.length > 0) {
          await CageRepository.UpdateStaffInCage(
            cage_ID,
            veterinaryStaff_id,
            false,
            true,
            lastModified
          );
        } 
        // 2.1.2.2. ID nhân viên chưa tồn tại trong chuồng
        else {
          await CageRepository.InsertStaffToCage(veterinaryStaff_id, cage_ID, lastModified, false, true, true, lastModified);
        }
      }
      // 2.2. Kiểm tra xem nhân viên chăm sóc và nhân viên kỹ thuật có cùng 1 ID không? (Trường hợp khác ID)
      else {
        const resultStaffInCage = await CageRepository.SearchEmployeeInCage(cage_ID, livestockStaff_id);
        // 2.2.1. Đã có ID nhân viên trong chuồng rồi
        if(resultStaffInCage.length > 0) {
          await CageRepository.UpdateStaffInCage(cage_ID, livestockStaff_id, true, true, true, lastModified);
        }
        // 2.2.2. Chưa có ID nhân viên trong chuồng rồi
        else {
          await CageRepository.InsertStaffToCage(livestockStaff_id, cage_ID, lastModified, true, true, true, lastModified);
        }
      }

      ReturnResponseUtil.returnResponse(
        res,
        200,
        true,
        `Updated Cage Successfully`
      );
    } catch (error) {
      ReturnResponseUtil.returnResponse(
        res,
        400,
        false,
        `An error has occurred, please try again`
      );
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
      ReturnResponseUtil.returnResponse(
        res,
        200,
        true,
        "Deleted Cage successfully"
      );
    }
  }
}

module.exports = CageController;
