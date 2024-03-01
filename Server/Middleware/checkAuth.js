const jwt = require('jsonwebtoken');

const checkAuth = (accessTokenSecret, refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET) => {
  return async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const refreshToken = req.cookies;

      if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      try {
        jwt.verify(accessToken, accessTokenSecret);
        next();
      } catch (error) {
        const refreshDecoded = await jwt.verify(refreshToken, refreshTokenSecret);
        req.accessToken = jwt.sign({ email: refreshDecoded.email }, accessTokenSecret, {
          expiresIn: '10m',
        });
        next();
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = checkAuth;
