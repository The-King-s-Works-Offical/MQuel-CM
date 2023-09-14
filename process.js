/*
    File : process.js Version : 1.0.1
 */

const ConfigManager = require("./server/Config")
const RadioManager = require("./server/Radio")

class ProcessManager {
    loaded() {
        const cM = new ConfigManager()
        cM.init()
        const rM = new RadioManager()
        rM.init()
    }
}


module.exports = ProcessManager