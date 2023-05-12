const userModel = require('../models/UserModel');

class UserController {
    static async GetAllUsers(req, res) {
        if (req.query.hasOwnProperty('username')) {

            var username = req.query.username;

            var result = await userModel.GetUserByUsername(username);
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.status(404).send("No users found");
            }
        }
        else {
            var result = await userModel.GetAllUsers();
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.status(404).send("No users found");
            }
        }
    }

    static async InsertUser(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var fullname = req.body.fullname;
        var DOB = req.body.DOB;
        var address = req.body.address;
        var email = req.body.email;
        var phone = req.body.phone;
        var role_ID = req.body.role_ID;

        var user = await userModel.GetUserByUsername(username);

        if (user.length === 0) {
            var result = await userModel.InsertUser(username, password, fullname, DOB, address, email, phone, role_ID);
            if (result) {
                res.status(200).send("Created User successfully");
            }
            else {
                res.status(400).send("Create User failed");
            }
        }
        else {
            res.status(400).send("Create User failed");
        }
    }

    static async GetUserByID(req, res) {
        var id = req.params.id;

        var result = await userModel.GetUserByID(id);
        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.status(404).send("No user found");
        }
    }

    static async DeleteUser(req, res) {
        var id = req.params.id;

        var result = await userModel.DeleteUserByID(id);
        if (result) {
            res.status(204).send("User deleted successfully");
        }
        else {
            res.status(404).send("User not found");
        }
    }

    static async UpdateUser(req, res) {
        var id = req.params.id;

        var password = req.body.password;
        var fullname = req.body.fullname;
        var DOB = req.body.DOB;
        var address = req.body.address;
        var email = req.body.email;
        var phone = req.body.phone;

        var result = await userModel.UpdateUserByID(password, fullname, DOB, address, email, phone, id);
        if (result) {
            res.status(200).send("User updated successfully");
        }
        else {
            res.status(404).send("User not found");
        }
    }
}

module.exports = UserController;