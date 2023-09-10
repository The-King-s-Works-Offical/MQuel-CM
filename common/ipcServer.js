const electron = require('electron');
const fs = require('fs');
const path = require('path');
const IpcCommand = require("./ipcCommand");
const profileManager = require('../server/ProfileManager')
const modManager = require('../server/Mods');
const musicManager = require('../server/Music');
const radioManager = require('../server/Radio');
const ScreenShotManager = require('../server/Screenshot');
const { event } = require('jquery');
const { request } = require('http');


class IpcServer {
    constructor(window) {
        this.window = window;

        this.toolbar();
        this.profile();
        this.mod();
        this.music();
        this.radio();
        this.screenshot();
        //this.save();
        this.appLanguageLoader();
    }
    appLanguageLoader() {
        electron.ipcMain.on(IpcCommand.GET_LANG, (event, request) => {
            const localeFile = path.join(__dirname, '../languages/en.json');
            const localeFileReadStream = fs.readFileSync(localeFile, "utf8");
            const localeFileData = JSON.parse(localeFileReadStream);
            event.reply(IpcCommand.GET_LANG, localeFileData)

        });
    }
    toolbar() {
        electron.ipcMain.on(IpcCommand.WINDOW_MINIMIZE, (event, request) => {
            this.window.minimize();
        });
        electron.ipcMain.on(IpcCommand.WINDOW_MAXIMIZE, (event, request) => {
            if (!this.window.isMaximized()) {
                setTimeout(() => {
                    this.window.maximize();
                }, 500);
            } else {
                setTimeout(() => {
                    this.window.restore();
                }, 500);
            }
        });
        electron.ipcMain.on(IpcCommand.WINDOW_CLOSE, (event, request) => {
            this.window.close();
        });
    }

    profile() {
        const CMD = IpcCommand.PROFILE;
        electron.ipcMain.on(CMD.ALL_PROFILE_COUNT, (event, request) => {
            console.log("Request All Profile Count : " + request)
            const count = new profileManager().getCount()
            event.reply(CMD.ALL_PROFILE_COUNT, count)
        });
        electron.ipcMain.on(CMD.ALL_PROFILE_DATA, (event, request) => {
            console.log("Request All Profiles : " + request)
            const profiles = new profileManager().getAll()
            event.reply(CMD.ALL_PROFILE_DATA, profiles)
        });
    }
    mod() {
        const CMD = IpcCommand.MOD;
        electron.ipcMain.on(CMD.ALL_MOD_COUNT, (event, request) => {
            console.log("Request All Mod Count: " + request)
            const count = new modManager().getCount();
            event.reply(CMD.ALL_MOD_COUNT, count);
        });
        electron.ipcMain.on(CMD.ALL_MOD_DATA, (event, request) => {
            console.log("Request All Mod Data :" + request)
            const mods = new modManager().getAll();
            event.reply(CMD.ALL_MOD_DATA, mods)
        });
        electron.ipcMain.on(CMD.DELETE, (event, request) => {
            console.log("Request Delete Mod :" + request)
            const response = new modManager().delete(request)
            console.log(response);
            event.reply(CMD.DELETE, response)
        });
        electron.ipcMain.on(CMD.ADD, (event, request) => {
            console.log("Request Add Mod :" + request)
            alert("Add Mod Function");
        });
    }
    music() {
        const CMD = IpcCommand.MUSIC;
        electron.ipcMain.on(CMD.ALL_MUSIC_COUNT, (event, request) => {
            console.log("Request All Music Count : " + request)
            const count = new musicManager().getCount();
            event.reply(CMD.ALL_MUSIC_COUNT, count);
        })
    }
    radio() {

        // Radio Commands 

        const CMD = IpcCommand.RADIO;
        // Uploading all Radio information to the application
        electron.ipcMain.on(CMD.LOAD, (event, request) => {
            console.log("Request to upload all radio information to the application : " + request)
            new radioManager().init()
            
        });
        // Radio ALL Count
        electron.ipcMain.on(CMD.COUNT, (event, request) => {
            console.log("Request All Radio Count : " + request)
            const rM = new radioManager()
            const count = rM.getCount()
            //const count = new radioManager().getCount();
            event.reply(CMD.COUNT, count);
        });

        // Radio All Data
        electron.ipcMain.on(CMD.DATA, (event, request) => {
            console.log("Request All Radio Data : " + request)
            const rM = new radioManager();
            const liveStreams = rM.getAll();
            if (liveStreams.length > 0) {
                const result = {
                    status: 200,
                    data: liveStreams
                }
                event.reply(CMD.DATA, result)
            } else {
                const result = {
                    status: 404,
                    message: "No installed live stream stations found!",
                    data: {}
                }
                event.reply(CMD.DATA, result)
                electron.dialog.showErrorBox("Upload live stream", result.message)

            }
        });
    }
    screenshot() {
        const CMD = IpcCommand.SCREENSHOT;
        electron.ipcMain.on(CMD.ALL_SCREENSHOT_COUNT, (event, request) => {
            console.log("Request All Screenshot Count : " + request);
            const count = new ScreenShotManager().getCount()
            event.reply(CMD.ALL_SCREENSHOT_COUNT, count);
        })
    }



}

module.exports = IpcServer;
