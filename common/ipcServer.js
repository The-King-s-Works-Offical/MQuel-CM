const electron = require('electron');
const IpcCommand = require("./ipcCommand");


class IpcServer {
    constructor(window) {
        this.window = window;
    }
    appLanguages() {
        electron.ipcMain.on(IpcCommand.GET_LANG, (event, arg) => {
            
            const localeFile = __dirname + "/languages/en.json";
            const localeFileReadStream = fs.readFileSync(localeFile, "utf8");
            const localeFileData = JSON.parse(localeFileReadStream);
        
            event.reply(IpcCommand.GET_LANG, localeFileData)
            // Cannot access 'IpcServer' before initialization
            //event.reply
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
        electron.ipcMain.on(IpcCommand.PROFILE.ALL_PROFILE_COUNT, (event, arg) => {
            console.log("GetProfilesCount")
          });
    }

}

module.exports = IpcServer;