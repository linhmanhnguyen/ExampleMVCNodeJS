function authorize(roles) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json(
                {
                    "isSuccess": false,
                    "message": `Your role '${userRole}' is not allowed to perform this action`
                }
            );
        }

        next();
    };
}

module.exports = { authorize };