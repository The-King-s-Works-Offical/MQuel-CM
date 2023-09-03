const electron = require('electron');
const fs = require('fs');
const path = require('path');
const IpcCommand = require("./ipcCommand");
const profileManager = require('../server/ProfileManager')

class IpcServer {
    constructor(window) {
        this.window = window;
        electron.ipcMain.on(IpcCommand.GET_LANG, (event, arg) => {
            const localeFile = path.join(__dirname, '../languages/en.json');
            const localeFileReadStream = fs.readFileSync(localeFile, "utf8");
            const localeFileData = JSON.parse(localeFileReadStream);
            event.reply(IpcCommand.GET_LANG, localeFileData)

        });
    }

    toolbar() {
        electron.ipcMain.on(IpcCommand.WINDOW_MINIMIZE, (event, arg) => {
            this.window.minimize();
        });
        electron.ipcMain.on(IpcCommand.WINDOW_MAXIMIZE, (event, arg) => {
            if (!this.window.isMaximized()) {
                setTimeout(() => {
                    this.window.maximize();
                }, 500);
            } else {
                setTimeout(() => {
                    this.window.restore();
                }, 500);
            }
        });
        electron.ipcMain.on(IpcCommand.WINDOW_CLOSE, (event, arg) => {
            this.window.close();
        });
    }

    profile() {
        const CMD = IpcCommand.PROFILE;
        electron.ipcMain.on(CMD.ALL_PROFILE_COUNT, (event, arg) => {
            const count = new profileManager().getCount()
            event.reply(CMD.ALL_PROFILE_COUNT, count)
        });
    }


}

module.exports = IpcServer;