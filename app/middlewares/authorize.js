const jwt = require('jsonwebtoken');

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers['auth-token'];

        if (!token) {
            return res.status(403).send('A token is required for authentication');
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).send('Your role is not allowed to perform this action');
            }

            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).send('Invalid Token');
        }
    }
};

module.exports = {
    authorizeRoles
}