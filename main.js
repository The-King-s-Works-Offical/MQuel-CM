"use strict";
/*
 * File : Main.js Version : v1.0.3
 */
// System Modules
const url = require("url");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra")

const electron = require("electron");
const processManager = require("./process")
const {
    app, ipcMain, dialog
} = electron;

// User Modules
const mainApp = require("./Apps");
const child_process = require("child_process");
const {request} = require("express");
let execProcess

const EtsDecrypt = () => {
    const childApp = child_process.execFile("EtsDecrypt.exe", {cwd: path.join(__dirname, "scripts", "sii")}, (error, stdout, stderr,) => {
        if (error) {
            console.error(`ExecProcess error: ${error}`);

        }
    });

    return childApp
}

process.on("loaded", () => {
    const package_json = JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf-8"))
    const infoLogStream = fs.createWriteStream(path.join(process.env.APPDATA, package_json.name, "log.log"));
    process.stdout.write = infoLogStream.write.bind(infoLogStream);
    process.stderr.write = infoLogStream.write.bind(infoLogStream);


    console.log("App Loaded");
})
process.on("disconnect", () => {
    console.log("Process Disconnected")
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
    console.log(path.join(app.getPath('appData'), app.name))
    dialog.showMessageBox(null, {
        type: 'question',
        title: 'Sii Decrypt',
        message: 'Would you like to decrypt files with Ets 2 Sii extension?',
        buttons: ['Cancellation', 'Decrypt the Codes'],
    }).then((result) => {
        console.log("MessageBox Return Value : ", result)
        if (result.response == 1) {
            execProcess = EtsDecrypt()

            execProcess.on('close', (code) => {
                new mainApp()
                const pM = new processManager()
                pM.loaded()
            })
        } else {
            new mainApp()
            const pM = new processManager()
            pM.loaded()
        }

    })
});


// When all windows of the application are closed
app.on("before-quit", () => {
    const pM = new processManager()
    pM.killed()
})

app.on("quit", () => {

    app.quit();
})