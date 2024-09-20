const router = require("express").Router();
const authRouter = require("./auth.routes");
const productsRouter = require("./product.routes");
const animalsRouter = require("./animal.routes");
const tokensRouter = require("./token.routes");

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/animals", animalsRouter);
router.use("/tokens", tokensRouter);

module.exports = router