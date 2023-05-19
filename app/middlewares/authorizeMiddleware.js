function authorize(role) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (userRole !== role) {
            return res.status(403).json({ message: `Your role '${userRole}' is not allowed to perform this action` });
        }

        next();
    };
}

module.exports = { authorize };