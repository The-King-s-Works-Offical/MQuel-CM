const ConfigManager = require("../Config")
const path = require("path")
const fs = require("fs")

class GamesConfigManager {
  constructor() {
    this.className = "Games_Config_Manager"
    this.method = ""

    this.cM = new ConfigManager()
    this.cM.load()
    this._paths = this.cM.getPaths()
    this._gameBaseConfigFilePath = this._paths.config_cfg_file
    this._appBaseGamesConfigJsonPath = path.join(this._paths.application_file, "GamesConfig", "data.json",)
    this.result = ""
  }

  init = () => {
    this.method = "init()"
    try {
      fs.mkdirSync(path.join(this._paths.application_file, "GamesConfig"), {
        recursive: true,
      })
      const configs = fs.readFileSync(path.join(this._gameBaseConfigFilePath), "utf-8",)
      const gameConfigsJSON = []
      configs.split("\n").forEach((line, arrayIndex) => {
        if (line.startsWith("uset")) {
          let configLine = line.split(" ")
          const key = configLine[1]
          const value = configLine[2].replaceAll('"', ' ').trim()
          gameConfigsJSON.push({
            "key": key, "value": value
          })
        }
      })
      const dataString =
          {"data": gameConfigsJSON}

      fs.writeFileSync(this._appBaseGamesConfigJsonPath, JSON.stringify(dataString), "utf-8")

      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log(`🎮️ ${this.className}.${this.method}`)

      } else {
        console.log(`🎮️ ${this.className}.${this.method} Not working`)
      }
    }
  }

  load = () => {
    this.method = "load()"
    this.init()
    try {
      const gamesConfigData = fs.readFileSync(this._appBaseGamesConfigJsonPath, "utf-8")
      this._baseData = JSON.parse(gamesConfigData)
      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log(`🎮️ ${this.className}.${this.method}`)
      } else {
        console.log(`🎮️ ${this.className}.${this.method} Didn't work`)
      }
    }
  }

  save = (configData) => {
    this.method = "save(configData)"
    try {
      const gameConfigsJSON = ["# prism3d variable config data\n",]
      configData.forEach((data,index) => {
        const key = data.name
        const value = data.value

        gameConfigsJSON.push(`uset ${key} "${value}"`)
      })
      const writeData = gameConfigsJSON.join("\n");
      fs.writeFileSync(this._gameBaseConfigFilePath,writeData,"utf-8")
      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log(`🎮️ ${this.className}.${this.method}`)
      } else {
        console.log(`🎮️ ${this.className}.${this.method} Didn't work`)
      }
    }
  }

  getAll = () => {
    this.method = "getAll()"
    try {
      this.result = true
      return this._baseData.data
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log(`🎮️ ${this.className}.${this.method}`)
      } else {
        console.log(`🎮️ ${this.className}.${this.method} Didn't work`)
      }
    }
  }

  /*
    this.method = "load()"
    try {

      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log(`🎮️ ${this.className}.${this.method}`)
      } else {
        console.log(`🎮️ ${this.className}.${this.method} Didn't work`)
      }
    }
        */
}

module.exports = GamesConfigManager
