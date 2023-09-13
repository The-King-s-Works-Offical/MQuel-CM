"use strict"
/*
    File : ConfigManager.js
    version : v1.0.3
*/
const fs = require("fs")
const path = require("path")

class ConfigManager {
  constructor() {
    this.result = ""
  }
  init() {
    try {
      const packageData = fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8")
      const discord = {
        rpc: true,
        application_id: 1132021187858419832,
        client_id: 1132021187858419832,
        public_key: "178cfbd71c39f0eb34062749e50fa63125544e88f83a4f3c9414877557e01f47"
      }
      const paths = {
        games: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Euro Truck Simulator 2\\",
        document: `C:\\Users\\${process.env.username}\\Documents\\Euro Truck Simulator 2\\`,
        application_file: path.join(process.env.APPDATA, JSON.parse(packageData).name),
      }
      const data = {
        discord, paths
      }
      this._config = data
      fs.writeFileSync(path.join(process.env.APPDATA, JSON.parse(packageData).name, "config.json"), JSON.stringify(this._config))

      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log("⚙️ ConfigManager().init() ")
      } else {
        console.log(`⚙️ ConfigManager().init() Didn't work`)
      }
    }
  }

  load() {
    try {

      const packageData = fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8")
      this._data = fs.readFileSync(path.join(process.env.APPDATA, JSON.parse(packageData).name, "config.json"), "utf8")
      this._config = JSON.parse(this._data)
      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log("⚙️ ConfigManager().load() ")
      } else {
        console.log(`⚙️ ConfigManager().load() Didn't work`)
      }
    }
  }

  getPaths() {
    try {
      this.result = true
      return this._config.paths
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log("⚙️ ConfigManager().getPaths() ")
      } else {
        console.log(`⚙️ ConfigManager().getPaths() Didn't work`)
      }
    }

  }
  getDiscord() {
    try {
      this.result = true
      return this._config.discord
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log("⚙️ ConfigManager().getDiscord() ")
      } else {
        console.log(`⚙️ ConfigManager().getDiscord() Didn't work`)
      }
    }

  }
}
exports.ConfigManager = ConfigManager