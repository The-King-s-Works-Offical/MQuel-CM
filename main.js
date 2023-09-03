"use strict";
// System Modules
const url = require("url");
const path = require("path");
const fs = require("fs");
const electron = require("electron");
const {
  app,
  ipcMain
} = electron;

// User Modules

const mainApp = require("./Apps");


// Application keeps Error log
process.on("uncaughtException", (error) => {
  const errorMessage = `Uncaught Exception:\n${error.stack || error}`;
  fs.writeFileSync("crash.log", errorMessage, "utf-8");
});

// Works when the application is ready
app.on("ready", () => {
  new mainApp();
  ipcMain.on(IpcCommand.GET_LANG, (event, arg) => {
    const localeFile = __dirname + "/languages/en.json";
    const localeFileReadStream = fs.readFileSync(localeFile, "utf8");
    const localeFileData = JSON.parse(localeFileReadStream);

    event.reply(IpcCommand.GET_LANG, localeFileData)
    // Cannot access 'IpcServer' before initialization
    //event.reply
  });

});

// When all windows of the application are closed
app.on("window-all-closed", () => {
  app.quit();
});