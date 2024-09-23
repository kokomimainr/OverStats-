const AuthController = require("../controllers/authController");
const router = require("express").Router();

router
.route("/reg")
.post(AuthController.registrationAuth);

router
.route("/authorization")
.post(AuthController.authorizationAuth);

router
.route("/logout")
.delete(AuthController.logoutAuth);

module.exports = router;
