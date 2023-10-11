/*
    File : process.js Version : 1.0.1
 */

const ConfigManager = require("./server/Config")
const RadioManager = require("./server/Radio")
const GamesConfigManager = require("./server/Games")
const ProfileManager = require("./server/Profile")
const fs = require("fs");

class ProcessManager {
    loaded = () => {
        const cM = new ConfigManager()
        cM.init()
        const rM = new RadioManager()
        rM.init()
        const gcM = new GamesConfigManager()
        gcM.init()

        const pM = new ProfileManager()
        pM.init()

        console.log("Process Loaded ")
    }

    killed = () => {
        const pM = new ProfileManager()
        pM.kill()
        console.log("Process Killed !")
    }
}


module.exports = ProcessManager