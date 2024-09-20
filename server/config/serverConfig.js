const express = require("express");
const removeHeader = require("../middleware/removeHeader");
const cookieParser = require("cookie-parser");

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(removeHeader);
  app.use(cookieParser());
};

module.exports = serverConfig;
