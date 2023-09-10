"use strict";
const {
  dialog
} = require("electron");
const { ConfigManager } = require("./ConfigManager");

// User Modules
const cs = require("../../common/").consoleStyle;

module.exports = ConfigManager;