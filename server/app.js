const serverConfig = require("./config/serverConfig");
const express = require("express");
require("dotenv").config();
const indexRoutes = require("./routes/index.routes");

const app = express();
const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use("/api", indexRoutes);

app.listen(PORT, () => {
  console.log(`пашем на ${PORT}`);
});
