const { jwt } = require("jsonwebtoken");


const authorize = async (req, res, next) => {

  try{
   // Get the token from the cookies
    const token = req.cookies.token;
    console.log(req.cookie.token)
    // If there's no token, return an error
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Verify the token and extract the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.userId = decoded.userId;

       // Call the next middleware function

      next();

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = authorize;

