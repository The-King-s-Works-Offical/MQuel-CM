const {
    ipcRenderer
} = require('electron');
const fs = require("fs");
const path = require("path");
const cs = require("../../consoleStyle");
const {
    IpcCommand
} = require("../../ipcCommand");
const ConfigManager = require("../Config/index");


class RadioManager {
    constructor() {
        this._config = new ConfigManager();
        console.log("RadioManager constructor");
        this._path = this._config.documentsPath.replaceAll("\\", "/");
        this._playList = []
        const live_streams = fs.readFileSync(path.join(this._path, "live_streams.sii"), "utf-8");
        const live_stream = live_streams.split("\n");
        this._live_stream = live_stream
        const localStorageStreams = [];
        live_stream.forEach((satir, index) => {
            localStorageStreams.push({
                key: index + 1,
                value: satir
            })

        });
        console.log(localStorageStreams)
        this._testStreams = localStorageStreams


    }

    getCount() {
        let lenKey
        let lenValue
        this._live_stream.forEach((satir, index) => {
            if (index == 3) {
                let len = satir
                lenKey = len.split(": ")[0]
                lenValue = len.split(": ")[1]
                //console.log(lenValue);
            }
        });
        lenValue = Number(lenValue)

        return lenValue

    }
    getAll() {
        return this._playList
    }
    getStreams() {
        return this._testStreams;
    }


}

module.exports = RadioManager;