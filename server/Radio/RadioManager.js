"use strict"
/*
    File : RadioManager.js Version : v1.0.7
*/
const fs = require("fs")
const path = require("path")
const ConfigManager = require("../Config/index")

class RadioManager {
    constructor() {
        this.cM = new ConfigManager()
        this.cM.load();
        this._paths = this.cM.getPaths()
        this._path = this._paths.document
        this.result = ""
        this._baseLiveStreamsFile = path.join(this._path, "live_streams.sii")
        this._appBaseLiveStreamsDirectory = path.join(this._paths.application_file, "Live_Stream")
        this._liveStreamsJsonPath = path.join(this._appBaseLiveStreamsDirectory, "data.json")
        this._baseData = []
    }

    init() {
        try {
            this._liveStreamList = []
            this._liveStreamCount = 0

            const live_streams_file_data = fs.readFileSync(this._baseLiveStreamsFile, "utf-8")
            let id_count = 0
            live_streams_file_data.split("\n").forEach((line, index) => {
                if (index === 3) {
                    this._liveStreamCount = line.split(": ")[1]
                } else if (line.startsWith(" stream_data")) {


                    const base_line = line
                    line = line.split(": ")
                    let data = line[1].split("|")
                    const url = data[0].replace('"', '').trim()
                    const name = data[1].trim()
                    const type = data[2].trim()
                    const lang = data[3].trim()
                    const bit = data[4].trim()
                    const favorite = Number(data[5].replace('"', '').trim())

                    this._liveStreamList.push({
                        id: id_count, index, url, name, type, lang, bit, favorite, base_line
                    })
                    id_count += 1
                }
            })
            const data = {
                count: Number(this._liveStreamCount),
                data: this._liveStreamList
            }
            fs.mkdirSync(this._appBaseLiveStreamsDirectory, {recursive: true})

            fs.writeFileSync(this._liveStreamsJsonPath, JSON.stringify(data))
            this._baseData = this._data
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().init()")
            } else {
                console.log(`📻 RadioManager().init() -> Failed to load radio streams from  `)
            }
        }


    }

    load() {
        try {

            const liveStreams = fs.readFileSync(this._liveStreamsJsonPath, "utf-8")
            this._baseData = JSON.parse(liveStreams)

            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().load() ")
            } else {
                console.log(`📻 RadioManager().load() Didn't work`)
            }
        }


    }


    getCount() {
        try {
            const count = this._baseData.count
            this.result = true
            return count

        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().getCount() ")
            } else {
                console.log(`📻 RadioManager().getCount() Didn't work`)
            }
        }
    }
    getAll() {
        try {
            this.result = true
            return this._baseData.data
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().getAll() ")
            } else {
                console.log(`📻 RadioManager().getAll() Didn't work`)
            }
        }
    }

    add(id) {
    }
    /*
        try {

            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().METHOD_NAME() ")
            } else {
                console.log(`📻 RadioManager().METHOD_NAME() Didn't work`)
            }
        }
    */
}

exports.RadioManager = RadioManager
