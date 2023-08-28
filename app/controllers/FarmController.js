

const moment = require('moment-timezone');

const UserAccountRepository = require('../repositories/UserAccountRepository');
const UserDetailRepository = require('../repositories/UserDetailRepository');
const FarmRepository = require('../repositories/FarmRepository');
const HistoryCageEntryRepository = require('../repositories/HistoryCageEntryRepository');
const HistoryCageEntryDetailRepository = require('../repositories/HistoryCageEntryDetailRepository');
const EventRepository = require('../repositories/EventRepository');
const AnimalRepository = require('../repositories/AnimalRepository');
const ReturnResponseUtil = require('../utils/returnResponse');
const BuyerRepository = require('../repositories/BuyerRepository');
const HistorySellAnimalsRepository = require('../repositories/HistorySellAnimalsRepository');
const HistorySellAnimalsDetailRepository = require('../repositories/HistorySellAnimalsDetailRepository');
const SupplierRepository = require('../repositories/SupplierRepository');

const { farmSchema } = require('../validations/farmSchema');
const { insertEntryCage } = require('../validations/historyEntryCageSchema');
const { insertBuyer } = require('../validations/buyerSchema');
const { insertSHistorySellAnimals } = require('../validations/historySellAnimals');

var currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class FarmController {

    /**
     * Function Controller: Thêm 1 trang trại vào hệ thống
     */
    static async InsertFarm(req, res) {
        try {

            await farmSchema.validateAsync(req.body);

            const farmName = req.body.farmName;
            const animalType_ID = req.body.animalType_ID;
            const animalDensity = req.body.animalDensity;
            const ward_ID = req.body.ward_ID;
            const addressDetail = req.body.addressDetail;
            const status = true;

            const lastModified = currentTime;
            const createDate = currentTime;
            const result = await FarmRepository.InsertFarm(farmName, createDate, status, animalType_ID, animalDensity, ward_ID, addressDetail, lastModified);

            if (result) {
                const farm_ID = result;
                const userAccount_ID = req.user.userAccount_ID;

                // Dựa theo tài khoản đang thực hiện, gán thông tin tài khoản đó vào trong farm vừa tạo
                await UserAccountRepository.InsertUserAccountToFarm(userAccount_ID, farm_ID, createDate, status);
                ReturnResponseUtil.returnResponse(res, 200, true, 'Created Farm successfully', farm_ID);

            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Lấy toàn bộ danh sách trang trại
     */
    static async GetAllFarms(req, res) {

        var useraccount_id = req.user.userAccount_ID;

        var result = await FarmRepository.GetAllFarms(useraccount_id);
        if (result == null) {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
        else {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get All Animal Types Successfully', result);
        }
    }

    /**
     * Function Controller: Lấy thông tin trang trại bằng ID
     */
    static async GetFarmByID(req, res) {
        var id = req.params.id;
        var result = await FarmRepository.GetFarmByID(id);
        if (result != null) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get farm successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller: Cập nhật thông tin của trang trại
     */
    static async UpdateFarmByID(req, res) {
        try {
            await farmSchema.validateAsync(req.body);

            var farmName = req.body.farmName;
            var status = req.body.status;
            var animalType_ID = req.body.animalType_ID;
            var animalDensity = req.body.animalDensity;
            var ward_ID = req.body.ward_ID;
            var addressDetail = req.body.addressDetail;
            var lastModified = currentTime;

            var id = req.params.id;
            var result = await FarmRepository.UpdateFarmByID(farmName, status, animalType_ID, animalDensity, ward_ID, addressDetail, lastModified, id);

            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Farm Updated Successfully');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Xóa trang trại
     */
    static async DeleteFarm(req, res) {
        try {
            var id = req.params.id;

            var result = await FarmRepository.DeleteFarm(id);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Deleted Farm successfully');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Thêm nhân viên hoặc quản lý vào trang trại
     */
    static async InsertMultipleUserToFarm(req, res) {
        try {
            const farm_id = req.params.id;

            const users = req.body.users;
            const list_users = JSON.parse(users);

            // property của user: {fullName, phoneNumber, gender, roleId, roleName}

            var numberSuccess = 0;
            for (let index = 0; index < list_users.length; index++) {
                if (list_users[index].hasOwnProperty('fullName') && list_users[index].hasOwnProperty('phoneNumber') && list_users[index].hasOwnProperty('gender') && list_users[index].hasOwnProperty('role_ID') && list_users[index].hasOwnProperty('roleName')) {
                    const fullName = list_users[index].fullName;
                    const phoneNumber = list_users[index].phoneNumber;       // usersname
                    const gender = list_users[index].gender;
                    const roleId = list_users[index].role_ID;
                    const roleName = list_users[index].roleName;

                    const createDate = currentTime;
                    const status = true;
                    const password = "123456789";

                    // b1: thêm thông tin của người dùng
                    const { insertId: userDetail_ID } = await UserDetailRepository.InsertUserDetailWhenSetupFarm(fullName, gender, phoneNumber);
                    // b2: thêm tài khoản
                    const { insertId: userAccount_ID } = await UserDetailRepository.InsertUserAccount(phoneNumber, password, createDate, userDetail_ID);
                    await UserAccountRepository.InsertRoleForUserAccount(userAccount_ID, roleId, createDate, status);
                    // b3: add ID của tài khoản với farm
                    await UserAccountRepository.InsertUserAccountToFarm(userAccount_ID, farm_id, createDate, status);
                    numberSuccess = ++numberSuccess;
                }
            }
            ReturnResponseUtil.returnResponse(res, 200, true, `Insert ${numberSuccess} users To Farm Successfully`, users);

        } catch (error) {
            // console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Lấy thông tin tổng quan về động vật trong trang trại như tổng động vật trong tất cả chuồng, số lượng động vật đang ốm, bình thường và đã chết
     */
    static async ReportAnimalSummary(req, res) {

        const farm_id = req.params.id;

        var result = await FarmRepository.ReportAnimalSummary(farm_id);
        if (result != null) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get Report Animal Sumary Successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller:  Thêm một lịch sử nhập chuồng 
     */
    static async InsertHistoryEntryCage(req, res) {
        try {
            // Kiểm tra và xác thực dữ liệu trong đối tượng yêu cầu bằng cách sử dụng một schema (insertEntryCage.validateAsync)
            await insertEntryCage.validateAsync({
                animalQuantity: req.body.animalQuantity,
                weightOfAnimal: req.body.weightOfAnimal,
            });

            // Trích xuất farm_id và user_id từ đối tượng yêu cầu (req)
            var farm_id = req.params.id;
            var user_id = req.user.userAccount_ID;

            // Trích xuất các thông tin về động vật từ đối tượng yêu cầu (req.body)
            var animalQuantity = req.body.animalQuantity;
            var weightOfAnimal = req.body.weightOfAnimal;
            var dateAction = currentTime;
            var cages = req.body.cages;
            const endDate = new Date(startDate);

            // Thêm 5 tháng vào ngày kết thúc
            endDate.setMonth(endDate.getMonth() + 5);

            var resultInsertEvent = await EventRepository.CreateEvent(dateAction, endDate.toISOString().split('T')[0]);
            const event_id = resultInsertEvent.insertId;

            // Gọi hàm InsertHistory từ model HistoryCageEntryRepository để chèn thông tin lịch sử vào database
            var resultHistoryCageEntry = await HistoryCageEntryRepository.InsertHistory(user_id, farm_id, animalQuantity, weightOfAnimal, dateAction, event_id);

            if (resultHistoryCageEntry) {
                if (cages.length > 0) {
                    for (let i = 0; i < cages.length; i++) {
                        const cage_id = cages[i].cage_id;
                        const animalsEntry = cages[i].animalsEntry;

                        await HistoryCageEntryDetailRepository.InsertHistory(cage_id, animalsEntry, resultHistoryCageEntry.insertId);

                        for (let j = 0; j < animalsEntry; j++) {
                            await AnimalRepository.InsertAnimal(cage_id, "test", "male", weightOfAnimal, dateAction, "normal");
                        }
                    }
                }
                // Trả về phản hồi thành công nếu mọi thứ đều thành công
                ReturnResponseUtil.returnResponse(res, 200, true, 'Inserted history entry cage successfully');
            }


        } catch (error) {
            // Nếu có lỗi xảy ra, ghi log và trả về phản hồi lỗi
            console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }


    /**
     * Function Controller: Lấy thông tin báo cáo nhập chuồng dựa trên 1 event
     */
    static async ReportEntryCage(req, res) {
        const farm_id = req.params.id;
        const event_id = req.params.event_id;
        const result = await FarmRepository.ReportEntryCage(farm_id, event_id);

        if (result) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get report entry cage successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Thống kê số động vật đạt tiêu chuẩn và không đạt tiêu chuẩn
     */
    static async ClassificationStatisticsOfAnimals(req, res) {
        try {
            const farm_id = req.params.id;
            const weight = req.query.weight;

            const resultStandardAnimals = await FarmRepository.GetStandardAnimals(weight, farm_id);
            const resultSubStandardAnimals = await FarmRepository.GetSubStandardAnimals(weight, farm_id);

            const data = {
                standardAnimals: resultStandardAnimals,
                subStandardAnimals: resultSubStandardAnimals
            };

            ReturnResponseUtil.returnResponse(res, 200, true, 'Get classification statistics of animals successfully', data);

        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller: Lấy thông tin tổng quan về động vật của từng chuồng như tổng động vật trong từng chuồng, số lượng động vật đang ốm, bình thường và đã chết
     */
    static async GetAnimalSummaryOfEachCage(req, res) {
        const farm_id = req.params.id;

        var result = await FarmRepository.ReportAnimalSummaryOfEachCage(farm_id);
        if (result != null) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get Report Animal Sumary Of Each Cage Successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller: Lấy thông tin tổng quan về chuồng như có bao nhiêu chuồng đang trống, bao nhiêu chuồng đang nuôi
     */
    static async GetCageSummary(req, res) {
        const farm_id = req.params.id;

        var result = await FarmRepository.GetCageSummary(farm_id);
        if (result != null) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get Cage Summary Successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }

    /**
     * Function Controller: Xuất bán
     */
    static async SellAnimals(req, res) {
        try {
            // Kiểm tra và xác thực dữ liệu trong đối tượng yêu cầu bằng cách sử dụng một schema (insertEntryCage.validateAsync)
            await insertSHistorySellAnimals.validateAsync({
                sellAnimals: req.body.sellAnimals,
                totalWeightAnimals: req.body.totalWeightAnimals,
                unitPrice: req.body.unitPrice
            });

            // Trích xuất farm_id và user_id từ đối tượng yêu cầu (req)
            var farm_id = req.params.id;
            var user_id = req.user.userAccount_ID;

            // Trích xuất các thông tin về động vật từ đối tượng yêu cầu (req.body)
            var sellAnimals = req.body.sellAnimals;
            var totalWeightAnimals = req.body.totalWeightAnimals;
            var unitPrice = req.body.unitPrice;
            var dateAction = currentTime;
            var buyer_id = req.body.buyer_id;
            var cages = req.body.cages;

            // Kiểm tra xem đang có mùa nào kích hoạt
            const events = await EventRepository.getEventByFarm(farm_id);

            if (EventRepository.isEventActive(events)) {
                // Thêm 1 đợt xuất bán tổng
                var resultInsertHistorySellAnimals = await HistorySellAnimalsRepository.InsertHistory(user_id, farm_id, sellAnimals, totalWeightAnimals, unitPrice, dateAction, buyer_id, events[0].id);
                if (resultInsertHistorySellAnimals) {

                    // Thêm các đợt xuất bán từ chuồng nào trong 1 đợt xuất bán tổng
                    if (cages.length > 0) {
                        for (let i = 0; i < cages.length; i++) {
                            const cage_id = cages[i].cage_id;
                            const sellAnimalsInCage = cages[i].sellAnimals;
                            const totalWeightAnimalsInCage = cages[i].totalWeightAnimals;

                            await HistorySellAnimalsDetailRepository.InsertHistory(cage_id, sellAnimalsInCage, totalWeightAnimalsInCage, resultInsertHistorySellAnimals.insertId);
                        }
                        ReturnResponseUtil.returnResponse(res, 200, true, 'Inserted history sell animals successfully');
                    }
                }
            }

        } catch (error) {
            console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Thêm thông tin bên người mua
     */
    static async InsertBuyer(req, res) {
        try {
            await insertBuyer.validateAsync();

            var farm_id = req.params.id;

            var name = req.body.name;
            var phone = req.body.phone;
            var ward_id = req.body.ward_id;
            var addressDetail = req.body.addressDetail;

            var result = await BuyerRepository.InsertBuyer(name, phone, ward_id, farm_id, addressDetail);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Inserted buyer successfully');
            }

        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Thêm thông tin của người cung cấp
     */
    static async InsertSupplier(req, res) {
        try {
            var farm_id = req.params.id;

            var name = req.body.name;
            var phone = req.body.phone;
            var ward_id = req.body.ward_id;
            var addressDetail = req.body.addressDetail;
            var supplyInventory_id = req.body.supplyInventory_id;

            var result = await SupplierRepository.InsertSupplier(farm_id, name, phone, ward_id, addressDetail, supplyInventory_id);
            if (result) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Inserted supplier successfully');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Lấy thông tin nhân viên trong trại
     */
    static async GetEmployeesInFarm(req, res) {
        var farm_id = req.params.id;

        var role_id = 4; // id của role nhân viên

        var result = await UserDetailRepository.GetUsersByRoleInFarm(role_id, farm_id);
        if (result != null) {
            ReturnResponseUtil.returnResponse(res, 200, true, 'Get Employees in farm successfully', result);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
        }
    }


}

module.exports = FarmController;
