"use strict"
/*
    File : ConfigManager.js Version : v1.0.5
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
      const config = data
      // C:\Users\%user%\AppData\Roaming\mquel-cm/config.json
      fs.writeFileSync(path.join(this.config.paths.application_file, "config.json"), JSON.stringify(config))
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
      this._data = fs.readFileSync(path.join(this.config.paths.application_file, "config.json"), "utf8")
      const configFileData = JSON.parse(this._data)
      this.result = true
      this._config = configFileData
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log("⚙️ ConfigManager().load() ")
        console.log("Load => ", this._config)
      } else {
        console.log(`⚙️ ConfigManager().load() Didn't work`)
      }
    }
  }

  getPaths() {
    try {
      this.result = true
      return "a"
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
