const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
//  console.log("body",req.body,req.body.userId)
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
        req.userId = decoded.id
        userId = decoded.id
    }else{
        return res.status(401).json({ message: 'Access denied. Invalid token.'  });
    }
    
    
    next();
   //return res.status(200).json({ message: 'token done' });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
