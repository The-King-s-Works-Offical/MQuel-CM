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
const child_process = require("child_process");
let execProcess

process.on("loaded", () => {
    const package_json = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf-8"))
    const infoLogStream = fs.createWriteStream(path.join(process.env.APPDATA, package_json.name, "log.log"));
    process.stdout.write = infoLogStream.write.bind(infoLogStream);
    process.stderr.write = infoLogStream.write.bind(infoLogStream);


    const pM = new processManager()
    pM.loaded()
    execProcess = child_process.execFile("EtsDecrypt.exe", {cwd: path.join(__dirname, "scripts", "sii")}, (error, stdout, stderr,) => {
        if (error) {
            console.error(`ExecProcess error: ${error}`);
            return;
        }
    });


    console.log("App Loaded");
})

// Application keeps Error log
process.on("uncaughtException", (error) => {
    const package_json = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf-8"))
  const errorMessage = `Uncaught Exception:\n${error.stack || error}`;
  console.error(errorMessage)
    fs.writeFileSync(path.join(process.env.APPDATA, package_json.name, "error.log"), errorMessage, "utf-8");
});

// Works when the application is ready
app.on("ready", () => {
    execProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    execProcess.on('close', (code) => {
        new mainApp()
    });


    let result = execProcess
    console.log(result)
});


// When all windows of the application are closed

app.on("window-all-closed", () => {
  app.quit();
});

app.on("quit", () => {
    execProcess.disconnect()
    app.quit();
})