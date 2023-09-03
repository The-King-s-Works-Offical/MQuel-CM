const fs = require("fs");
const path = require("path");
const ConfigManager = require("../Config/index");


class ModManager {
    constructor() {
        this._config = new ConfigManager();
        this._path = path.join(this._config.documentsPath, "mod").replaceAll("\\", "/");
        this._mods = []
        const mods = fs.readdirSync(this._path);
        for (const mod of mods) {
            this._mods.push(mod)
        }

    }

    getCount() {
        return this._mods.length;
    }
    getAll() {
        return this._mods
    }


}

module.exports = ModManager;