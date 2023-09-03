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
                id: mod.split(".")[0] + mod.split(".")[0].length,
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
    delete(modId) {
        console.log(modId)
        let result = "";
        this._mods.forEach(mod => {
            if (mod) {
                if (mod.id === modId) {
                    console.log(mod)

                    fs.unlink(mod.path, (err) => {
                        if (err) {
                            console.err(err);
                            result = { "status": false, "message": err }
                        } else {
                            result = { "status": true, "message": "Mod Basariyla Silindi !" }
                        }
                    });
                } else {
                    result = { "status": false, "message": "Mod Bulunamadı !" }
                }
            }
            else {
                result = { "status": false, "message": "Yüklü Mod Buluanamdı !" }
            }
        });
        console.log(result);
        return result;
    }


}

module.exports = ModManager;