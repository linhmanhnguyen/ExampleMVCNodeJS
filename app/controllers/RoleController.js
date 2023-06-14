const RoleModel = require("../models/RoleModel");

class RoleController {
    /**
     * Function Controller: Lấy tất cả các role
     */
    static async GetAllRoles(req, res) {
        try {
            var result = await RoleModel.GetAllRoles();
            if (result.length > 0) {
                res.status(200).json(
                    {
                        "isSuccess": true,
                        "message": "Get all roles successfully.",
                        "data": result,
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
        } catch (error) {
            res.status(400).json(
                {
                    "isSuccess": false,
                    "message": `An error has occurred, please try again.`,
                }
            );
        }
    }
}

module.exports = RoleController;