const fs = require("fs");
const path = require("path");

const ConfigManager = require("../Config/index");


class RadioManager {
    constructor() {
        this._config = new ConfigManager();
        this._path = this._config.documentsPath.replaceAll("\\", "/");
        this._liveStreamList = []
        this._liveStreamCount = 0;
        const live_streams_file_data = fs.readFileSync(path.join(this._path, "live_streams.sii"), "utf-8");
        live_streams_file_data.split("\n").forEach((line, index) => {
            if (index == 3) {
                this._liveStreamCount = line.split(": ")[1]
            }

            else if (line.startsWith(" stream_data")) {
                line = line.split(": ")
                let data = line[1].split("|")
                console.log(index + " => ");
                
                result = data
                
                const url = data[0].replace('"','').trim()

                console.log(result);
            }

        })
        /*        
        for (const live_stream_line of live_streams_file_data.split("\n")) {
            console.log(live_stream_line)
        }
        */
    }

    getCount() {
        return this._liveStreamCount;
    }
    getAll() {
        return this._liveStreams
    }
}

module.exports = RadioManager;