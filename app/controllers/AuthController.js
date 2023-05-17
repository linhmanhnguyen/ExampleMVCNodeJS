const userModel = require('../models/UserDetailModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    static async Login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userModel.GetUserByUsername(username);

        if (!user) {
            res.status(422).send("Email or Password is not correct");
        }

        const checkPassword = await bcrypt.compare(password, user[0].password);
        if (!checkPassword) {
            res.status(422).send("Email or Password is not correct");
        }

        const token = jwt.sign({ id: user[0].id, role: user[0].role_name }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
        res.header('auth-token', token).send(token);
        return token;
    }
}

module.exports = AuthController;