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
            this._mods.push({
                name: mod.split(".")[0],
                file: mod,
                path: this._path + "/" + mod
            })
        }

    }

    getCount() {
        return this._mods.length;
    }
    getAll() {
        return this._mods
    }
    deleteMod(mod) {
        /**
         * fs.unlink('myfile.txt', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Dosya başarıyla silindi.');
            }
            });
         */
        fs.unlink(this._path + "/" + mod.value + ".scs")
    }


}

module.exports = ModManager;