const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid accessToken" });
  }
};

module.exports = verifyAccessToken;
