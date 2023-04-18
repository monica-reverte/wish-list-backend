const jwt = require("jsonwebtoken");
const createError = require("./error");

const checkAuth = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError({ status: 401, message: "Unauthorized"}));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return next(createError({ status: 401, message: "Invalid Token"}))
        }else{
            req.user = decoded;
            return next();
        }
    });
};

module.exports = checkAuth;

