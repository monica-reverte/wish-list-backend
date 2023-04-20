const jwt = require("jsonwebtoken");



const checkAuth = (req, res,) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(503).json({
      ok: false,
      message: "Something happened"
    })
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError({ status: 401, message: 'Unauthorized, invalid token' }));
    }
    req.user = decoded;
    return res.status(503).json({
      ok: false,
      message: "Something happened"
    })
  });
};
