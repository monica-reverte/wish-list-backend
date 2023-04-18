const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const token = req.cookies.acces_token;
    if(!token) {
        return res.json("no token available");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.json("invalid token");
        }else{
            req.user = decoded;
            return next();
        }
    });
};

module.exports = checkAuth;

