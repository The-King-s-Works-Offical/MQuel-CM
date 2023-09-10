const fs = require("fs");
const path = require("path");
const ConfigManager = require("../Config/index");

class RadioManager {
    constructor() {
        try {
            this.result = "";
            console.log("📻 RadioManager()")
            this._config = new ConfigManager();
            this._path = this._config.documentsPath.replaceAll("\\", "/");

            this.result = true
        } catch (error) {
            this.result = false
            console.error(error);
        } finally {
            if (this.result) {
                console.log("📻 RadioManager() ")
            } else {
                console.log(`📻 RadioManager() Didn't work`);
            }
        }



    }

    init() {
        try {
            this._liveStreamList = [];
            this._liveStreamCount = 0;
            const live_streams_file_data = fs.readFileSync(path.join(this._path, "live_streams.sii"), "utf-8");
            live_streams_file_data.split("\n").forEach((line, index) => {
                if (index == 3) {
                    this._liveStreamCount = line.split(": ")[1];
                }

                else if (line.startsWith(" stream_data")) {
                    line = line.split(": ");
                    let data = line[1].split("|");


                    const url = data[0].replace('"', '').trim();
                    const name = data[1].trim();
                    const type = data[2].trim();
                    const lang = data[3].trim();
                    const bit = data[4].trim();
                    const favorite = Number(data[5].replace('"', '').trim());

                    this._liveStreamList.push({
                        id: index - 4, index, url, name, type, lang, bit, favorite
                    });
                }
            });
            this._data = {
                count: this._liveStreamCount,
                data: this._liveStreamList
            }

            this.liveStreamsJsonPath = path.join(__dirname, "data.json");
            fs.writeFileSync(this.liveStreamsJsonPath, JSON.stringify(this._data))
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error);
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().init()")
            } else {
                console.log(`📻 RadioManager().init() -> Failed to load radio streams from  `);
            }
        }


    }

    getCount() {
        try {
            const dataReadStream = fs.readFileSync(__dirname + "/data.json", "utf-8");
            console.log(JSON.parse(dataReadStream));
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error);
        } finally {
            if (this.result) {
                console.log("📻 RadioManager().getCount() ")
            } else {
                console.log(`📻 RadioManager().getCount() Didn't work`);
            }
        }
    } 
    getAll() {
        return this._liveStreamList;
    }
    delete(id) {
        console.log(this._data)
    }
}
exports.RadioManager = RadioManager;
