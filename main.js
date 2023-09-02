"use strict";
// System Modules
const url = require("url");
const path = require("path");
const fs = require("fs");
const electron = require("electron");
const {
  app
} = electron;

// User Modules
// --> const { command } = require("./scripts/ipcCommand");
const mainApp = require("./src/Apps");


// Application keeps Error log
process.on("uncaughtException", (error) => {
  const errorMessage = `Uncaught Exception:\n${error.stack || error}`;
  fs.writeFileSync("crash.log", errorMessage, "utf-8");
});

// Works when the application is ready
app.on("ready", () => {
  startServer();
  new mainApp();
});
// When all windows of the application are closed
app.on("window-all-closed", () => {
  app.quit();
});

// Function that initializes the API Server
function startServer() {
  const {
    spawn,
    spawnSync,
    exec,
    execSync,
  } = require("child_process");
  const serverProcess = spawn("node", [path.join(__dirname, "server.js")]);
  // Server.js'den gelen çıktıları konsola yazdırın.
  serverProcess.stdout.on("data", (data) => {
    //console.log(`${data.toString()}`);
    console.log(`${data}`);
    fs.appendFile('serverLog.log', data, function (err) {
      if (err) throw console.error(err);
      //console.log('Server Log Updated!');
    });
  });
  serverProcess.stderr.on("data", (data) => {
    console.error(`Server.js stderr: ${data}`);
    fs.writeFileSync("serverCrash.log", data, "utf-8");
    fs.appendFile('serverCrash.log', data, function (err) {
      if (err) throw err;
      console.log('Server Crash Log Updated!');
    });
  });
  // Before checking out
  app.on("before-quit", () => {
    serverProcess.kill();
  });
}