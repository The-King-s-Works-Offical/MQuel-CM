const {
  BrowserWindow,
  ipcMain
} = require("electron");

const fs = require("fs");
const url = require("url");
const path = require("path");
const $ = require('jquery');

const IpcCommand = require("./common/ipcCommand");
const IpcServer = require("./common/ipcServer");

class mainWindow {
  constructor() {
    const mainWindow = new BrowserWindow({
      width: 1450,
      height: 950,
      minWidth: 1185,
      minHeight: 630,
      frame: false,
      icon: __dirname + "icon.ico",
      title: "MQuel | Content Manager ",
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    mainWindow.once("focus", () => win.flashFrame(false));
    mainWindow.flashFrame(true);
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "client/home.html"),
        protocol: "file",
        slashes: true,
      }),
    );
    try {

      mainWindow.webContents.on(
        "did-fail-load",
        (event, errorCode, errorDescription, validatedURL) => {
          if (errorCode === -6) {
            // -6, ERR_FILE_NOT_FOUND hatası

            mainWindow.loadURL(
              url.format({
                pathname: path.join(__dirname, "/client/404.html"),
                protocol: "file",
                slashes: true,
              }),
            );
          }
        },
      );


     
      /* const IpcServer = new IpcServer(mainWindow);
      IpcServer.toolbar(); */
      mainWindow.webContents.openDevTools();
      ipcMain.on(IpcCommand.GET_PROFILE_COUNT, (event, arg) => {
        console.log("GetProfilesCount")
      });
      ipcMain.on(IpcCommand.GET_LANG, (event, arg) => {
        const localeFile = __dirname + "/languages/en.json";
        const localeFileReadStream = fs.readFileSync(localeFile, "utf8");
        const localeFileData = JSON.parse(localeFileReadStream);
    
        event.reply(IpcCommand.GET_LANG, localeFileData)
        // Cannot access 'IpcServer' before initialization
        //event.reply
      });


    } catch (error) {
      console.error(error);
      console.error(error.errorMessage);
    }
    return mainWindow;
  }
}
module.exports = mainWindow;