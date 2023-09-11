"use strict";
// System Modules
const url = require("url");
const path = require("path");
const fs = require("fs");
const electron = require("electron");
const configManager = require("./server/Config")
const {
  app,
  ipcMain
} = electron;

// User Modules
const mainApp = require("./Apps");


process.on("loaded", () => {
  console.log("App Loaded");
  new configManager().init();
})

// Application keeps Error log
process.on("uncaughtException", (error) => {
  const errorMessage = `Uncaught Exception:\n${error.stack || error}`;
  console.error(errorMessage)
  fs.writeFileSync("crash.log", errorMessage, "utf-8");
});

// Works when the application is ready
app.on("ready", () => {
  new mainApp();


});

// When all windows of the application are closed
app.on("window-all-closed", () => {
  app.quit();
});