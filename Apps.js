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
      icon: path.join(process.cwd(), "icon.ico"),
      title: "MQuel | Content Manager ",
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
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

      const ipcServer = new IpcServer(mainWindow);
      

      //mainWindow.webContents.openDevTools();

    } catch (error) {
      console.error(error);
      console.error(error.errorMessage);
    }
    return mainWindow;
  }
}
module.exports = mainWindow;