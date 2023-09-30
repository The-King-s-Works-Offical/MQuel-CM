const electron = require('electron')
const fs = require('fs')
const path = require('path')
const IpcCommand = require("./ipcCommand")
//const profileManager = require('../server/ProfileManager')
//const modManager = require('../server/Mods')
//const musicManager = require('../server/Music')
const RadioManager = require("../server/Radio")
const GameConfigManager = require("../server/Games")

//const ScreenShotManager = require('../server/Screenshot')


class IpcServer {
    constructor(window) {
        this.window = window

        this.toolbar()
        this.profile()
        this.mod()
        this.music()
        this.radio()
        this.screenshot()
        this.gameConfig()
        this.appLanguageLoader()
    }

    appLanguageLoader = () => {
        electron.ipcMain.on(IpcCommand.GET_LANG, (event, request) => {
            const localeFile = path.join(__dirname, '../languages/en.json')
            const localeFileReadStream = fs.readFileSync(localeFile, "utf8")
            const localeFileData = JSON.parse(localeFileReadStream)
            event.reply(IpcCommand.GET_LANG, localeFileData)

        })
    }

    toolbar = () => {
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

    radio = () => {
        let addRadio
        // Radio Commands

        const CMD = IpcCommand.RADIO

        /*
         * Radio All Count Function - Start
         */
        electron.ipcMain.on(CMD.COUNT, (event, request) => {
            console.log("Request All Radio Count : " + request)
            const rM = new RadioManager()
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
        let data
        electron.ipcMain.on(CMD.DATA, (event, request) => {
            console.log("Request All Radio Data : " + request)
            const rM = new RadioManager()
            rM.load()
            let res = rM.getAll()
            const liveStreams = res
            if (liveStreams.length > 0) {
                const result = {
                    status: 200, data: liveStreams
                }
                event.reply(CMD.DATA, result)
            } else {
                const result = {
                    status: 404, message: "No installed live stream stations found!", data: {}
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
                    height: 400,
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

        electron.ipcMain.on(CMD.DELETE, (event,request) => {
            console.log("Radio deletion request : ",true)
            if (request.data.length < 1) {
                electron.dialog.showErrorBox("Delete Radio","No radio has been chosen!")
            } else {
                const rM = new RadioManager();
                rM.load()
                rM.delete(request.data)

            }
        })

        /*
         * Radio Modal Dialog Close - Start
         */
        electron.ipcMain.on(CMD.MODAL.CLOSE, (event, request) => {
            console.log("Request Radio Add Modal to close : ", request)
            addRadio.close()
            addRadio = undefined
            this.window.reload()
        })
        /*
         * Radio Modal Dialog Close - End
         */

        /*
         * Radio Modal Dialog Form Question - Start
         */
        electron.ipcMain.on(CMD.MODAL.FORM.QUESTION, (event, request) => {
            const questionTitle = request.title
            const questionMessage = request.message
            electron.dialog.showMessageBox(this.window, {
                title: questionTitle,
                message: questionMessage,
                buttons: ["Back", "Okay"],
                type: "question"
            })
                .then((result) => {
                if (result.response === 1) {
                    event.reply(CMD.MODAL.FORM.QUESTION, {
                        status: 200,
                        statusMessage: "OK",
                        questionMessage: request.message,
                        command: request.command
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
            const rM = new RadioManager()
            const result = rM.add(request)
            event.reply(CMD.MODAL.FORM.INSERT, result)
        })
        /*
         * Radio Modal Dialog Form Insert - End
         */


    }

    gameConfig = () => {
        let result
        let command_title = ''
        const CMD = IpcCommand.GAME_CONFIG
        electron.ipcMain.on(CMD.LOAD, (event, request) => {
            command_title = CMD.LOAD
            try {
                console.log("Request to upload all Game config information: ", true)
                const gCM = new GameConfigManager();
                gCM.load()
                const data = gCM.getAll()
                event.reply(CMD.LOAD, data)


                result = true
            } catch (error) {
                result = false
                console.error(error)
                console.error(error.message)
            } finally {
                if (result) {
                    console.log(`🎮 Game Config Command : ${command_title}`)
                } else {
                    console.log(`🎮 Game Config Command : ${command_title} Didn't work`)
                }
            }
        })

        electron.ipcMain.on(CMD.SAVE, (event, request) => {
            command_title = CMD.SAVE
            try {
                console.log("Request to upload all Game config information: ", true)
                const gCM = new GameConfigManager();
                gCM.save(request)

                result = true
            } catch (error) {
                result = false
                console.error(error)
                console.error(error.message)
            } finally {
                if (result) {
                    console.log(`🎮 Game Config Command : ${command_title}`)
                } else {
                    console.log(`🎮 Game Config Command : ${command_title} Didn't work`)
                }
            }
        })
    }

    profile = () => {
    }


    mod = () => {

    }

    music = () => {
    }

    screenshot = () => {

    }


}

module.exports = IpcServer
