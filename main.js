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


process.on("loaded", () => {
    const package_json = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf-8"))
    const infoLogStream = fs.createWriteStream(path.join(process.env.APPDATA, package_json.name, "log.log"));
    process.stdout.write = infoLogStream.write.bind(infoLogStream);
    const errorLogStream = fs.createWriteStream(path.join(process.env.APPDATA, package_json.name, "error.log"));
    process.stderr.write = errorLogStream.write.bind(errorLogStream);


    const pM = new processManager()
    pM.loaded()
    console.log("App Loaded");
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