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
    this._path = path.join(process.cwd(), "/config.json").replaceAll("\\", "/");

    const exists = fs.existsSync(this._path);
    if (!exists) {
      let data = `{
        "isSession": false,
        "auth": "public",
        "discordRPC": true,
        "discordClientId": "47953047587390485790",
        "systemStartReady": false,
        "gamesPath": "C:/Program Files (x86)/Steam/steamapps/common/Euro Truck Simulator 2/",
        "documentsPath": "C:/Users/murse/Documents/Euro Truck Simulator 2/"
      }`;
      fs.writeFileSync(this._path, data);
    }
    this._data = fs.readFileSync(this._path, "utf8")
    this._config = JSON.parse(this._data);

    return this._config;

  }

}


module.exports = ConfigManager;