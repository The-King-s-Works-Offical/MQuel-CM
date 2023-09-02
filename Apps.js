const {
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");

const url = require("url");
const IpcCommand = require("./common/ipcCommand");
const {
  spawnSync
} = require("child_process");
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

      mainWindow.on("ready-to-show", () => {

        mainWindow.webContents.openDevTools();
        ipcMain.on(IpcCommand.WINDOW_MINIMIZE, (event, arg) => {
          mainWindow.minimize();
        });
        ipcMain.on(IpcCommand.WINDOW_MAXIMIZE, (event, arg) => {
          if (!mainWindow.isMaximized()) {
            setTimeout(() => {
              mainWindow.maximize();
            }, 500);
          } else {
            setTimeout(() => {
              mainWindow.restore();
            }, 500);
          }
        });
        ipcMain.on(IpcCommand.WINDOW_CLOSE, (event, arg) => {
          mainWindow.close();
        });

        ipcMain.on(IpcCommand.GET_PROFILE_COUNT, (event, arg) => {
          console.log("GetProfilesCount")
        });

      });
    } catch (error) {
      console.error(error);
      console.error(error.errorMessage);
    }
    return mainWindow;
  }
}
module.exports = mainWindow;