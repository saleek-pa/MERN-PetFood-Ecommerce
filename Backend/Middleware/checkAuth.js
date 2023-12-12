const jwt = require("jsonwebtoken");

const checkAuth = (accessTokenSecret, refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET) => {
   return (req, res, next) => {
      try {
         const accessToken = req.headers.authorization.split(" ")[1];
         const refreshToken = req.cookies.jwt;

         if (!accessToken || !refreshToken) {
            res.status(401).json({ message: "Unauthorized" });
         }

         jwt.verify(accessToken, accessTokenSecret, (error, decoded) => {
            if (error) {
               jwt.verify(refreshToken, refreshTokenSecret, (refreshError, refreshDecoded) => {
                  if (refreshError) {
                     return res.status(401).json({ message: "Authentication failed" });
                  } else {
                     req.accessToken = jwt.sign({ email: refreshDecoded.email }, accessTokenSecret, {
                        expiresIn: "10m",
                     });
                     next();
                  }
               });
            } else {
               next();
            }
         });
      } catch (error) {
         res.status(401).json({ message: "Unauthorized" });
      }
   };
};

module.exports = checkAuth;
