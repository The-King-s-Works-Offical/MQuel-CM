const fs = require("fs");
const path = require("path");

const ConfigManager = require("../Config/index");


class MusicManager {
    constructor() {
        this._config = new ConfigManager();
        this._path = path.join(this._config.documentsPath, "music").replaceAll("\\", "/");
        this._playList = []
        const musics = fs.readdirSync(this._path);
        for (const music of musics) {
            this._playList.push(music)
        }

    }

    getCount() {
        return this._playList.length;
    }
    getAll() {
        return this._playList
    }


}

module.exports = MusicManager;