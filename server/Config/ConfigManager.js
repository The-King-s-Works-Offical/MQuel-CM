"use strict"
/*
    File : ConfigManager.js Version : v1.0.6
*/
const fs = require("fs")
const path = require("path")

class ConfigManager {
    constructor() {
        this.className = "Config_Manager"
        this.method = ""
        this.result = ""
        const packagePath = process.mainModule.path + "/package.json"
        const packageData = fs.readFileSync(packagePath, "utf-8")
        this._gameDocuments = `C:\\Users\\${process.env.username}\\Documents\\Euro Truck Simulator 2\\`
        this._baseApplicationRoamingFile = path.join(process.env.APPDATA, JSON.parse(packageData).name)
        this._baseConfigPath = path.join(this._baseApplicationRoamingFile, "config.json")
        this._baseApplicationMainFile = process.mainModule.path
        this._config = ""
    }

    init() {
        this.method = "init()"
        try {
            const discord = {
                rpc: true,
                application_id: 1132021187858419832,
                client_id: 1132021187858419832,
                public_key: "178cfbd71c39f0eb34062749e50fa63125544e88f83a4f3c9414877557e01f47"
            }
            const paths = {

                document: this._gameDocuments,
                application_file: this._baseApplicationRoamingFile,
                application_base_file: this._baseApplicationMainFile,
                liveStream_file: path.join(this._gameDocuments, "live_streams.sii"),
                mod_directory: path.join(this._gameDocuments, "mod"),
                mod_info_file: path.join(this._gameDocuments, "mods_info.sii"),
                music_directory: path.join(this._gameDocuments, "music"),
                profiles_directory: path.join(this._gameDocuments, "profiles"),
                screenshot_directory: path.join(this._gameDocuments, "screenshot"),
                history_console_file: path.join(this._gameDocuments, "_history.sii"),
                config_cfg_file: path.join(this._gameDocuments, "config.cfg"),
                config_ds_cfg_file: path.join(this._gameDocuments, "config_ds.cfg"),
                game_crash_log_file: path.join(this._gameDocuments, "game.crash.txt"),
                game_log_file: path.join(this._gameDocuments, "game.log.txt"),
                global_controls_file: path.join(this._gameDocuments, "global_controls.sii"),
                inventory_item_data_file: path.join(this._gameDocuments, "inventory_item_data.sii"),
                net_log_file: path.join(this._gameDocuments, "net.log"),
                news_file: path.join(this._gameDocuments, "news.sii"),
                readme_file: path.join(this._gameDocuments, "readme.rtf"),
                server_config_file: path.join(this._gameDocuments, "server_config.sii"),
                server_packages_file: path.join(this._gameDocuments, "server_packages.sii")

            }
            const data = {
                discord, paths
            }
            const config = data
            // C:\Users\%user%\AppData\Roaming\mquel-cm/config.json
            fs.writeFileSync(this._baseConfigPath, JSON.stringify(config))
            this.result = true
        } catch (error) {

            this.result = false
            console.error(error)

        } finally {

            if (this.result) {
                console.log(`⚙️ ${this.className}.${this.method} ️️`)
            } else {
                console.log(`⚙️ ${this.className}.${this.method} ️️ Didn't work`)
            }

        }
    }

    load() {
        this.method = "laod()"
        try {
            this._data = fs.readFileSync(this._baseConfigPath, "utf8")
            const configFileData = JSON.parse(this._data)
            this.result = true
            this._config = configFileData
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`⚙️ ${this.className}.${this.method} ️️`)
            } else {
                console.log(`⚙️ ${this.className}.${this.method} ️️ Didn't work`)
            }
        }
    }

    getPaths() {
        this.method = "getPaths()"
        try {
            this.result = true
            return this._config.paths
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`⚙️ ${this.className}.${this.method} ️️`)
            } else {
                console.log(`⚙️ ${this.className}.${this.method} ️️ Didn't work`)
            }
        }

    }

    getDiscord() {
        this.method = "getDiscord()"
        try {
            this.result = true
            return this._config.discord
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`⚙️ ${this.className}.${this.method} ️️`)
            } else {
                console.log(`⚙️ ${this.className}.${this.method} ️️ Didn't work`)
            }
        }

    }
}

exports.ConfigManager = ConfigManager
