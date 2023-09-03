"use strict";
const {
  dialog
} = require("electron");
const fs = require("fs");
const path = require("path");

// User Modules
const cs = require("../../common/").consoleStyle;

class ConfigManager {
  constructor() {
    console.log("------------------------------------------------")
    //console.log(cs.constructorLog("Config Manager initialized"));
    this._path = path.join(process.cwd(), "/config.json").replaceAll("\\", "/");

    const exists = fs.existsSync(this._path);
    if (!exists) {

      fs.writeFileSync(this._path, "config");
    }
    this._data = fs.readFileSync(this._path, "utf8")
    this._config = JSON.parse(this._data);
    return this._config;

  }

}


module.exports = ConfigManager;