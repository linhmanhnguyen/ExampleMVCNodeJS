
const userAccountModel = require('../models/UserAccountModel')
const moment = require('moment-timezone');
const { farmSchema } = require('../validations/farmSchema');
const UserAccountModel = require('../models/UserAccountModel');
const UserDetailModel = require('../models/UserDetailModel');
const FarmRepository = require('../repositories/FarmRepository');
const HistoryCageEntryModel = require('../models/HistoryCageEntryModel');
const { insertEntryCage } = require('../validations/historyEntryCage');
const CageModel = require('../models/CageModel');
const AnimalRepository = require('../repositories/AnimalRepository');
const EventRepository = require('../repositories/EventRepository');

const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

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
                await userAccountModel.InsertUserAccountToFarm(userAccount_ID, farm_ID, createDate, status);

                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Created Farm successfully`,
                        "data": farm_ID
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
     * Function Controller: Lấy toàn bộ danh sách trang trại
     */
    static async GetAllFarms(req, res) {

        var useraccount_id = req.user.userAccount_ID;

        var result = await FarmRepository.GetAllFarms(useraccount_id);
        if (result == null) {
            res.status(404).json(
                {
                    "isSuccess": false,
                    "message": `No records found at the moment.`,
                }
            );
        }
        else {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get All Animal Types Successfully`,
                    "data": result
                }
            );
        }
    }

    /**
     * Function Controller: Lấy thông tin trang trại bằng ID
     */
    static async GetFarmByID(req, res) {
        var id = req.params.id;
        var result = await FarmRepository.GetFarmByID(id);
        if (result != null) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get Farm Successfully`,
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
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Farm Updated Successfully`
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
     * Function Controller: Xóa trang trại
     */
    static async DeleteFarm(req, res) {
        try {
            var id = req.params.id;

            var result = await FarmRepository.DeleteFarm(id);
            if (result) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": `Deleted Farm successfully`,
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
                    const { insertId: userDetail_ID } = await UserDetailModel.InsertUserDetailWhenSetupFarm(fullName, gender, phoneNumber);
                    // b2: thêm tài khoản
                    const { insertId: userAccount_ID } = await UserAccountModel.InsertUserAccount(phoneNumber, password, createDate, userDetail_ID);
                    await UserAccountModel.InsertRoleForUserAccount(userAccount_ID, roleId, createDate, status);
                    // b3: add ID của tài khoản với farm
                    await UserAccountModel.InsertUserAccountToFarm(userAccount_ID, farm_id, createDate, status);
                    numberSuccess = ++numberSuccess;
                }
            }

            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Insert ${numberSuccess} users To Farm Successfully`,
                    "data": users
                }
            )

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
     * Function Controller: Lấy thông tin tổng quan về động vật trong trang trại như tổng trong tất cả chuồng, số lượng động vật đang ốm, bình thường và đã chết
     */
    static async ReportAnimalSummary(req, res) {

        const farm_id = req.params.id;

        var result = await FarmRepository.ReportAnimalSummary(farm_id);
        if (result != null) {
            res.json(
                {
                    "isSuccess": true,
                    "message": `Get Report Animal Sumary Successfully`,
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
     * Function Controller:  Thêm một lịch sử nhập chuồng 
     */
    static async InsertHistoryEntryCage(req, res) {
        // Trích xuất farm_id và user_id từ đối tượng yêu cầu (req)
        var farm_id = req.params.id;
        var user_id = req.user.userAccount_ID;

        // Trích xuất các thông tin về động vật từ đối tượng yêu cầu (req.body)
        var typeAnimal_id = req.body.typeAnimal_id;
        var animalQuantity = req.body.animalQuantity;
        var weightOfAnimal = req.body.weightOfAnimal;
        var unitPrice = req.body.unitPrice;
        var dateAction = currentTime;
        var supplier_id = req.body.supplier_id;

        try {
            // Kiểm tra và xác thực dữ liệu trong đối tượng yêu cầu bằng cách sử dụng một schema (insertEntryCage.validateAsync)
            await insertEntryCage.validateAsync(req.body);

            // Kiểm tra xem đã có sự kiện liên quan đến việc nhập chuồng chưa
            const events = await EventRepository.getEventByFarm(farm_id);

            if (!EventRepository.isEventActive(events)) {
                // Nếu chưa có sự kiện hoặc sự kiện chưa kích hoạt, tạo một sự kiện mới với thời gian bắt đầu và kết thúc

                const start_date = currentTime;
                const end_date = null;
                const newEventId = await EventRepository.CreateEvent(start_date, end_date, 1, farm_id);
                if (newEventId) {
                    // Gọi hàm InsertHistory từ model HistoryCageEntryModel để chèn thông tin lịch sử vào database
                    var result = await HistoryCageEntryModel.InsertHistory(user_id, farm_id, typeAnimal_id, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplier_id, newEventId.insertId);
                    if (result) {
                        // Nếu chèn thành công, tiến hành chia số lượng động vật đang có vào các chuồng
                        // Bước này nhằm giả định động vật được phân bố đều vào số chuồng có sẵn
                        var resultTotalCages = await CageModel.GetAllCagesInFarm(farm_id);
                        var totalCages = resultTotalCages.length;

                        for (let index = 0; index < totalCages; index++) {
                            // Tính số lượng động vật trong mỗi chuồng (countAnimalsInCage) dựa trên tổng số động vật và số chuồng
                            const countAnimalsInCage = animalQuantity / totalCages;
                            const cage_id = resultTotalCages[index].id;

                            // Chèn từng con vật vào mỗi chuồng
                            for (let i = 0; i < countAnimalsInCage; i++) {
                                await AnimalRepository.InsertAnimal(cage_id, "test", "male", weightOfAnimal, dateAction, "normal");
                            }
                        }

                        // Trả về phản hồi thành công nếu mọi thứ đều thành công
                        res.status(200).json({
                            "isSuccess": true,
                            "message": `Inserted history entry cage successfully.`,
                        });
                    }
                }
            }
            else {
                var result = await HistoryCageEntryModel.InsertHistory(user_id, farm_id, typeAnimal_id, animalQuantity, weightOfAnimal, unitPrice, dateAction, supplier_id, events[0].id);
                if (result) {
                    // Nếu chèn thành công, tiến hành chia số lượng động vật đang có vào các chuồng
                    // Bước này nhằm giả định động vật được phân bố đều vào số chuồng có sẵn
                    var resultTotalCages = await CageModel.GetAllCagesInFarm(farm_id);
                    var totalCages = resultTotalCages.length;

                    for (let index = 0; index < totalCages; index++) {
                        // Tính số lượng động vật trong mỗi chuồng (countAnimalsInCage) dựa trên tổng số động vật và số chuồng
                        const countAnimalsInCage = animalQuantity / totalCages;
                        const cage_id = resultTotalCages[index].id;

                        // Chèn từng con vật vào mỗi chuồng
                        for (let i = 0; i < countAnimalsInCage; i++) {
                            await AnimalRepository.InsertAnimal(cage_id, "test", "male", weightOfAnimal, dateAction, "normal");
                        }
                    }

                    // Trả về phản hồi thành công nếu mọi thứ đều thành công
                    res.status(200).json({
                        "isSuccess": true,
                        "message": `Inserted history entry cage successfully.`,
                    });
                }
            }
        } catch (error) {
            // Nếu có lỗi xảy ra, ghi log và trả về phản hồi lỗi
            // console.log(error);
            res.status(400).json({
                "isSuccess": false,
                "message": `An error has occurred, please try again.`,
            });
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
            res.status(200).json(
                {
                    "isSuccess": true,
                    "message": `Get report entry cage successfully`,
                    "data": result
                }
            )
        }
        else {
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }

    /**
     * Function Controller: Phân tích 
     */

}

module.exports = FarmController;
