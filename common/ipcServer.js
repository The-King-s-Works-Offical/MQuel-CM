const electron = require('electron')
const fs = require('fs')
const path = require('path')
const IpcCommand = require("./ipcCommand")
//const profileManager = require('../server/ProfileManager')
//const modManager = require('../server/Mods')
//const musicManager = require('../server/Music')
const radioManager = require('../server/Radio')
const {request} = require("express")
const {RadioManager} = require("../server/Radio/RadioManager");

//const ScreenShotManager = require('../server/Screenshot')


class IpcServer {
    constructor(window) {
        this.window = window

        console.log(this.window)
        this.toolbar()
        this.profile()
        this.mod()
        this.music()
        this.radio()
        this.screenshot()
        this.save()
        this.appLanguageLoader()
    }

    appLanguageLoader() {
        electron.ipcMain.on(IpcCommand.GET_LANG, (event, request) => {
            const localeFile = path.join(__dirname, '../languages/en.json')
            const localeFileReadStream = fs.readFileSync(localeFile, "utf8")
            const localeFileData = JSON.parse(localeFileReadStream)
            event.reply(IpcCommand.GET_LANG, localeFileData)

        })
    }

    toolbar() {
        electron.ipcMain.on(IpcCommand.WINDOW_MINIMIZE, (event, request) => {
            this.window.minimize()
        })
        electron.ipcMain.on(IpcCommand.WINDOW_MAXIMIZE, (event, request) => {
            if (!this.window.isMaximized()) {
                setTimeout(() => {
                    this.window.maximize()
                }, 500)
            } else {
                setTimeout(() => {
                    this.window.restore()
                }, 500)
            }
        })
        electron.ipcMain.on(IpcCommand.WINDOW_CLOSE, (event, request) => {
            this.window.close()
            electron.app.quit()
        })
    }

    radio() {
        let addRadio
        // Radio Commands

        const CMD = IpcCommand.RADIO

        /*
         * Radio All Count Function - Start
         */
        electron.ipcMain.on(CMD.COUNT, (event, request) => {
            console.log("Request All Radio Count : " + request)
            const rM = new radioManager()
            rM.load()
            let res = rM.getCount()
            event.reply(CMD.COUNT, res)

        })
        /*
         * Radio All Count Function - End
         */

        /*
         * Radio All Data Function - Start
         */
        electron.ipcMain.on(CMD.DATA, (event, request) => {
            console.log("Request All Radio Data : " + request)
            const rM = new radioManager()
            rM.load()
            let res = rM.getAll()
            const liveStreams = res
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
        })
        /*
         * Radio All Data Function - End
         */

        /*
         * Radio Add Modal Dialog Create Function - Start
         */
        electron.ipcMain.on(CMD.ADD, (event, request) => {
            console.log("Request to add a radio: ", request)
            if (addRadio === undefined) {
                addRadio = new electron.BrowserWindow({
                    width: 800,
                    height: 350,
                    title: "Radio Add Form",
                    frame: false,
                    resizable: true,
                    fullscreenable: false,
                    icon: path.join(process.mainModule.path, "icon.ico"),
                    webPreferences: {
                        preload: path.join(process.mainModule.path, 'preload.js'),
                        nodeIntegration: true,
                        contextIsolation: false,
                    },
                    autoHideMenuBar: true,
                })


                addRadio.loadFile(path.join(process.mainModule.path, "client", "modal", "add_radio.html"))
                addRadio.set
                addRadio.show()
                this.window.on("focus", () => {
                    if (addRadio) {
                        addRadio.focus()
                    }
                })
            } else {
                electron.dialog.showMessageBoxSync({
                    title: "Radio Add Form",
                    message: "Radio add form open !",
                    detail: "Make sure the radio insertion form is open | make sure the window is closed !",
                    type: "warning"
                })
            }


        })
        /*
         * Radio Add Modal Dialog Create Function - End
         */

        /*
         * Radio Modal Dialog Close - Start
         */
        electron.ipcMain.on(CMD.MODAL.CLOSE, (event, request) => {
            console.log("Request Radio Add Modal to close : ", request)
            addRadio.close()
            addRadio = undefined
        })
        /*
         * Radio Modal Dialog Close - End
         */

        /*
         * Radio Modal Dialog Form Question - Start
         */
        electron.ipcMain.on(CMD.MODAL.FORM.QUESTION, (event, request) => {
            const reqQuestion = request;
            const resQuestion = electron.dialog.showMessageBox(this.window, {
                title: "Add Radio", message: reqQuestion, buttons: ["Back", "Okay"], type: "question"
            }).then((result) => {
                if (result.response === 1) {
                    event.reply(CMD.MODAL.FORM.QUESTION, {
                        status: 200,
                        statusMessage: "OK",
                    })
                } else if (result.response === 0) {
                    event.reply(CMD.MODAL.FORM.QUESTION, {
                        status: 205,
                        statusMessage: "Reset Content"
                    })
                }
            })
        })
        /*
         * Radio Modal Dialog Form Question - End
         */


        /*
         * Radio Modal Dialog Form Insert - Start
         */
        electron.ipcMain.on(CMD.MODAL.FORM.INSERT, (event, request) => {
            console.log("Request to add radio to the system : " + true)
            const rM = new RadioManager();
            rM.add(request)
        })
    }

    profile() {
    }

    mod() {

    }

    music() {
    }

    screenshot() {

    }


    save() {
    }
}

module.exports = IpcServer
