const userModel = require('../models/UserModel');

class UserController {
    static async GetAllUsers(req, res) {
        if (req.query.hasOwnProperty('username')) {

            var username = req.query.username;

            var result = await userModel.GetUserByUsername(username);
            if (result) {
                res.send(result);
            }
            else {
                res.status(404).send("No users found");
            }
        }
        else {
            var result = await userModel.GetAllUsers();
            if (result) {
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

        var result = await userModel.InsertUser(username, password);
        if (result) {
            res.status(200).send("Created User successfully");
        }
        else {
            res.status(400).send("Create User failed");
        }
    }

    static async GetUserByID(req, res) {
        var id = req.params.id;

        var result = await userModel.GetUserByID(id);
        if (result) {
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
        var username = req.body.username;
        var password = req.body.password;

        var result = await userModel.UpdateUserByID(username, password, id);
        if (result) {
            res.status(200).send("User updated successfully");
        }
        else {
            res.status(404).send("User not found");
        }
    }
}

module.exports = UserController;