"use strict";
const fs = require("fs");
const path = require("path");

class ConfigManager {
  constructor() {

    this.init()
    this._data = fs.readFileSync(this._path, "utf8");
    this._config = JSON.parse(this._data);

    return this._config;

  }
  init() {
    const discord = {
      rpc: true,
      application_id: 1132021187858419832,
      client_id: 1132021187858419832,
      public_key: "178cfbd71c39f0eb34062749e50fa63125544e88f83a4f3c9414877557e01f47"
    }
    const paths = {
      games: "C:/Program Files (x86)/Steam/steamapps/common/Euro Truck Simulator 2/",
      document: `C:/Users/${process.env.username}/Documents/Euro Truck Simulator 2/`
    }
    const data = {
      discord, paths
    }


    const packageData = fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8")
    fs.writeFileSync(path.join(process.env.APPDATA,JSON.parse(packageData).name,"config.json"), JSON.stringify(data));

  }

}
exports.ConfigManager = ConfigManager;
