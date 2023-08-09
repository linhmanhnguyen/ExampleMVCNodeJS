
const bcrypt = require('bcrypt');
const UserAccountRepository = require('../repositories/UserAccountRepository');
const UserDetailRepository = require('../repositories/UserDetailRepository');
const moment = require('moment-timezone');
const { registerAccountSchema } = require('../validations/userAccountSchema');
const RoleRepository = require('../repositories/RoleRepository');
const FarmRepository = require('../repositories/FarmRepository');
const GenerateAccessToken = require('../utils/genarateAccessToken');
const ReturnResponseUtil = require('../utils/returnResponse');
const CageRepository = require('../repositories/CageRepository');
const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD_HH-mm-ss');

class AuthController {
    static async Login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserAccountRepository.SearchUserAccountByUsername(username);

        if (user.length > 0) {
            const checkPassword = await bcrypt.compare(password, user[0].password);
            if (!checkPassword) {
                ReturnResponseUtil.returnResponse(res, 422, false, `Password is not correct`);
            }
            else {
                if (user[0].status == true) {
                    const token = GenerateAccessToken.GenerateAccessTokenForOwnerWhenLogin(user[0].id, user[0].userDetail_id, user[0].roleName, user[0].farm_id);
                    ReturnResponseUtil.returnResponse(res, 200, true, 'Login Successful', token);
                }
                else {
                    ReturnResponseUtil.returnResponse(res, 422, false, `Account is not attivated`);
                }
            }
        }
        else {
            ReturnResponseUtil.returnResponse(res, 404, false, `No records found at the moment`);
        }

    }

    static async Register(req, res) {
        try {
            await registerAccountSchema.validateAsync({
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname,
                farmName: req.body.farmName,
                animalTypeId: req.body.animalTypeId,
                animalDensity: req.body.animalDensity,
                ward_ID: req.body.ward_ID,
                addressDetail: req.body.addressDetail,
                numberOfCages: req.body.numberOfCages
            });

            const { username, password, fullname } = req.body;
            const createDate = currentTime;
            const lastModified = currentTime;
            const status = true;
            const refreshtoken = "";
            const role_ID = 2; // Chủ sở hữu

            const farmName = req.body.farmName;
            const animalTypeId = req.body.animalTypeId;
            const animalDensity = req.body.animalDensity;
            const ward_ID = req.body.ward_ID;
            const addressDetail = req.body.addressDetail;
            const numberOfCages = req.body.numberOfCages;
            const accountList = req.body.accountList;
            // const accountList = JSON.parse(accountList);

            const checkExistUsername = await UserAccountRepository.CheckExistUsername(username);
            if (checkExistUsername.length > 0) {
                ReturnResponseUtil.returnResponse(res, 404, false, `Username already exists`);
            }
            else {
                const { insertId: userDetail_ID } = await UserDetailRepository.InsertUserDetailWhenRegister(fullname, username);
                const { insertId: userAccount_ID } = await UserAccountRepository.InsertUserAccount(username, password, createDate, userDetail_ID, refreshtoken);
                await UserAccountRepository.InsertRoleForUserAccount(userAccount_ID, role_ID, createDate, status);
                const role = await RoleRepository.GetRoleByID(role_ID);

                const { insertId: farm_ID } = await FarmRepository.InsertFarm(farmName, createDate, status, animalTypeId, animalDensity, ward_ID, addressDetail, lastModified);
                await UserAccountRepository.InsertUserAccountToFarm(userAccount_ID, farm_ID, createDate, status);

                if (numberOfCages > 0) {
                    for (let index = 0; index < numberOfCages; index++) {
                        var cageName = `Cage ${index + 1}`;
                        var location = index + 1;

                        await CageRepository.InsertCage(cageName, farm_ID, location);
                    }
                }

                if (accountList.length > 0) {
                    for (let index = 0; index < accountList.length; index++) {
                        if (accountList[index].hasOwnProperty('fullName') && accountList[index].hasOwnProperty('phoneNumber') && accountList[index].hasOwnProperty('gender') && accountList[index].hasOwnProperty('role_ID') && accountList[index].hasOwnProperty('roleName')) {
                            const fullName = accountList[index].fullName;
                            const phoneNumber = accountList[index].phoneNumber;       // usersname
                            const gender = accountList[index].gender;
                            const roleId = accountList[index].role_ID;
                            const roleName = accountList[index].roleName;

                            const createDate = currentTime;
                            const status = true;
                            const password = "123456789";

                            // b1: thêm thông tin của người dùng
                            const { insertId: userDetail_ID } = await UserDetailRepository.InsertUserDetailWhenSetupFarm(fullName, gender, phoneNumber);
                            // b2: thêm tài khoản
                            const { insertId: userAccount_ID } = await UserDetailRepository.InsertUserAccount(phoneNumber, password, createDate, userDetail_ID);
                            await UserAccountRepository.InsertRoleForUserAccount(userAccount_ID, roleId, createDate, status);
                            // b3: add ID của tài khoản với farm
                            await UserAccountRepository.InsertUserAccountToFarm(userAccount_ID, farm_ID, createDate, status);
                        }
                    }
                }

                const accesstoken = GenerateAccessToken.GenerateAccessTokenForOwner(userAccount_ID, userDetail_ID, role.roleName, farm_ID);

                ReturnResponseUtil.returnResponse(res, 200, true, `Register Successfully`, accesstoken);
            }

        } catch (error) {

            console.log(error);
            ReturnResponseUtil.returnResponse(res, 400, false, `An error has occurred, please try again`);
        }
    }

    static async CheckExistUsername(req, res) {
        const username = req.params.username;
        const checkExistUsername = await UserAccountRepository.CheckExistUsername(username);
        if (checkExistUsername.length > 0) {
            ReturnResponseUtil.returnResponse(res, 400, false, `Username already exists`);
        }
        else {
            ReturnResponseUtil.returnResponse(res, 200, true, `Username does not exist`);
        }
    }
}

module.exports = AuthController;
