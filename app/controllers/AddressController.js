const AddressRepository = require("../repositories/AddressRepository");
const ReturnResponseUtil = require("../utils/returnResponse");

class AddressController {
    /**
     * Function Controller: Lấy tất cả tỉnh thành trong database
     */
    static async GetAllProvinces(req, res) {
        try {
            var result = await AddressRepository.GetAllProvinces();
            if (result.length > 0) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Get all provinces successfully', result);
            }
            else {
                ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again.');
        }
    }

    /**
     * Function Controller: Lấy tất cả quận huyện trong 1 tỉnh thành
     */
    static async GetAllDistrictsByProvince(req, res) {
        try {
            var province_id = req.params.id;

            var result = await AddressRepository.GetAllDistrictsByProvince(province_id);
            if (result.length > 0) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Get all districts successfully', result);
            }
            else {
                ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
     * Function Controller: Lấy tất cả phường xã trong 1 quận huyện
     */
    static async GetAllWardsByDistrict(req, res) {
        try {
            var district_id = req.params.id;

            var result = await AddressRepository.GetAllWardsByDistrict(district_id);
            if (result.length > 0) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Get all wards successfully', result);
            }
            else {
                ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

    /**
 * Function Controller: Lấy địa chỉ cụ thể bằng Ward ID
 */
    static async GetAddressDetailsByWardID(req, res) {
        try {
            var wards_id = req.params.id;

            var result = await AddressRepository.GetAddressByWardID(wards_id);
            if (result.length > 0) {
                ReturnResponseUtil.returnResponse(res, 200, true, 'Get address detail successfully', result);
            }
            else {
                ReturnResponseUtil.returnResponse(res, 404, false, 'No records found at the moment');
            }
        } catch (error) {
            ReturnResponseUtil.returnResponse(res, 400, false, 'An error has occurred, please try again');
        }
    }

}

module.exports = AddressController;