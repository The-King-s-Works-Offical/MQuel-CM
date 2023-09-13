/*
 * File : Process.js Version : v1.0.0
 */
const configManager = require("./server/Config")

class ProcessManager {
    loaded() {
        const cM = new configManager();
        cM.init();
    }
}

module.exports = ProcessManager