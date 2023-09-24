/*
    ORGANIZATION : 
    PROJECT : MQuel-CM
    FILE : RadioManager.js
    Date : 17.09.2023

*/
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
        this.cM.load()
        this._paths = this.cM.getPaths()
        this._path = this._paths.document
        this.result = ""
        this._baseLiveStreamsFile = this._paths.liveStream_file
        this._appBaseLiveStreamsDirectory = path.join(this._paths.application_file, "Live_Stream",)
        this._liveStreamsJsonPath = path.join(this._appBaseLiveStreamsDirectory, "data.json",)
        this._baseData = []

    }

    init() {
        try {


            this._liveStreamList = []
            this._liveStreamCount = 0
            const live_streams_file_data = fs.readFileSync(this._baseLiveStreamsFile, "utf-8",)
            let id_count = 0
            live_streams_file_data.split("\n").forEach((line, index) => {
                let newline = line.trim()
                if (newline.startsWith("stream_data:")) {
                    this._liveStreamCount = newline.split(": ")[1]
                } else if (newline.startsWith("stream_data")) {
                    const base_line = newline
                    newline = newline.split(": ")
                    let data = newline[1].split("|")
                    const url = data[0].replace('"', "").trim()
                    const name = data[1].trim()
                    const type = data[2].trim()
                    const lang = data[3].trim()
                    const bit = data[4].trim()
                    const favorite = Number(data[5].replace('"', "").trim())

                    this._liveStreamList.push({
                        id: id_count, index, base_line_index: index, url, name, type, lang, bit, favorite, base_line,
                    })
                    id_count += 1
                }
            })
            const _data = {
                count: Number(this._liveStreamCount), data: this._liveStreamList,
            }
            fs.mkdirSync(this._appBaseLiveStreamsDirectory, {recursive: true})

            fs.writeFileSync(this._liveStreamsJsonPath, JSON.stringify(_data))
            this._baseData = _data
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().init()")
            } else {
                console.log(`📻 RadioManager().init() -> Failed to load radio streams from  `,)
            }
        }
    }

    load() {
        this.init()
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

    add(radioData) {
        let result

        const liveStream_file_path = this._paths.liveStream_file
        try {
            this.load()
            result = radioData

            let url, name, type, lang, bit, favorite

            for (let data of radioData.data) {
                switch (data.name) {
                    case "radio-url":
                        url = data.value
                        break
                    case "radio-name":
                        name = data.value
                        break
                    case "radio-type":
                        type = data.value
                        break
                    case "radio-language":
                        lang = data.value
                        break
                    case "radio-bit":
                        bit = data.value
                        break
                    case "radio-favorites":
                        favorite = data.value
                        break
                }
            }
            let item
            if (this._baseData.count > 0) {
                console.log(this._baseData.data[this._baseData.count - 1])
                const id = this._baseData.data[this._baseData.count - 1].id + 1
                const index = this._baseData.data[this._baseData.count - 1].index + 1
                const base_line = ` stream_data[${this._baseData.data[this._baseData.count - 1].id + 1}]: "${url}|${name}|${type}|${lang}|${bit}|${favorite}"`

                item = {
                    id: id, index, base_line_index: index, url, name, type, lang, bit, favorite, base_line,
                }
            } else {
                let lineStr = ` stream_data[0]: "${url}|${name}|${type}|${lang}|${bit}|${favorite}"`
                item = {
                    id: 0, index: 4, base_line_index: 4, url, name, type, lang, bit, favorite, base_line: lineStr,
                }
            }
            this._baseData.count += 1
            this._baseData.data.push(item)
            const strData = this._baseData
            fs.writeFileSync(this._liveStreamsJsonPath, JSON.stringify(strData))
            this.save()
            this.result = true
            return this.result
        } catch (error) {
            this.result = false
            console.error(error)
            return this.result
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().add() ")
            } else {
                console.log(`📻 RadioManager().add() Didn't work`)
            }
        }
    }

    delete(radioData) {
        let result
        try {
            result = radioData
            console.log("Before : ")
            console.log(this._baseData)

            for (let radio of radioData) {
                const radio_id = Number(radio.value)
                console.log(radio_id)
                delete this._baseData.data.splice(radio_id, 1)
                this._baseData.count -= 1

            }


            console.log("Islem Yapılıyor ......")
            /*
                for (let stream_item of this._baseData.data) {
                    console.log(stream_item.id+" => "+stream_item.name)
                }
            */

            console.log("After : ")
            console.log(this._baseData)
            this.save()
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().delete() ")
                console.log(result)

            } else {
                console.log(`📻 RadioManager().delete() Didn't work`)
            }
        }
    }

    save() {
        try {
            const count = this._baseData.data.length
            const allData = this._baseData.data
            const _path = this._baseLiveStreamsFile

            console.log(_path)
            console.log(count)
            console.log(" => ", allData)


            let lines = []
            lines.push("SiiNunit", "{", "live_stream_def : _nameless.mquel.cm {", ` stream_data: ${count}`)
            allData.forEach((stream, index) => {
                console.log("| " + index + " : - => ", stream)
                stream.id = index
                const line = ` stream_data[${index}]: \"${stream.url}|${stream.name}|${stream.type}|${stream.lang}|${stream.bit}|${stream.favorite}\"`
                lines.push(`${line}`)
            })
            lines.push("}", "}")
            const writeData = lines.join("\n")
            console.log(writeData)
            fs.writeFileSync(_path, writeData, "utf-8")

            this.result = true
            return true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().save() ")

            } else {
                console.log(`📻 RadioManager().save() Didn't work`)
            }
        }
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
