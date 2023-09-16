"use strict";
/*
 * File : Main.js Version : v1.0.3
 */
// System Modules
const url = require("url");
const path = require("path");
const fs = require("fs");

const electron = require("electron");
const processManager = require("./process")
const {
  app,
  ipcMain
} = electron;

// User Modules
const mainApp = require("./Apps");
const winston = require("winston");


process.on("loaded", () => {
    const package_json = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf-8"))
    const logStream = fs.createWriteStream(path.join(process.env.APPDATA, package_json.name, "logs.log"));
    process.stdout.write = logStream.write.bind(logStream);
    process.stderr.write = logStream.write.bind(logStream);

  console.log("App Loaded");
    const pM = new processManager()
    pM.loaded()

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
app.on("quit", () => {
    app.quit();
})