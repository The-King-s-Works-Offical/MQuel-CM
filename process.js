/*
    File : process.js Version : 1.0.1
 */

const ConfigManager = require("./server/Config")
const RadioManager = require("./server/Radio")
const GamesConfigManager = require("./server/Games")

class ProcessManager {
    loaded() {
        const cM = new ConfigManager()
        cM.init()
        const rM = new RadioManager()
        rM.init()
        const gcM = new GamesConfigManager();
        gcM.init()
    }
}


module.exports = ProcessManager