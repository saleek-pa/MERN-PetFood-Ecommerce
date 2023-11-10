const jwt = require("jsonwebtoken");

const checkAuth = (accessTokenSecret) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        jwt.verify(token, accessTokenSecret, (error) => {
          error ? res.status(401).json({ message: 'Authentication failed' }) : next();
        });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

module.exports = checkAuth