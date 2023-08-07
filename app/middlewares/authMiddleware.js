const jwt = require('jsonwebtoken');
const ReturnResponseUtil = require('../utils/returnResponse');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ReturnResponseUtil.returnResponse(res, 401, false, `Unauthorized`);

        // return res.status(401).json(
        //     {
        //         "isSuccess": false,
        //         "message": "Unauthorized"
        //     }
        // );
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            ReturnResponseUtil.returnResponse(res, 403, false, err);

            // return res.status(403).json(
            //     {
            //         "isSuccess": false,
            //         "message": err
            //     }
            // );
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };