const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;   
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log("Invalid refresh token");
    res.clearCookie("refreshToken").sendStatus(401);
  }
};

module.exports = verifyRefreshToken;
