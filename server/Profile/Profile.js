const fs = require("fs");
const path = require("path");
const dateFns = require("date-fns");
const ConfigManager = require("../Config")
const {json} = require("express");

class Profile extends ConfigManager {

    constructor(id, fileName, pathUrl) {
        super().init()
        this.className = "Profile"
        this.method = ""
        this.console = ""
        this.result = Boolean


        try {
            this._id = id;
            this._fileName = fileName;
            this._path = pathUrl;
            this._profileFile = {
                name: fileName,
                path: pathUrl.replaceAll("\\", "/"),
                profileFilePath: pathUrl.replaceAll("\\", "/") + "/profile.sii",
            };
            this._allFiles = [];
            this._configFile = {
                name: "", path: "",
            };
            this._controlsFile = {
                name: "", path: "",
            };
            this._gearboxFiles = [];

            this._saves = [];


            this._profileGeneralPath = path.join(this._baseApplicationRoamingFile, "Profiles", fileName)
            this._profileGeneralInfoPath = path.join(this._profileGeneralPath, "info.json")
            const _profileGeneralPathExists = fs.existsSync(this._profileGeneralPath)
            if (!_profileGeneralPathExists) {
                fs.mkdirSync(this._profileGeneralPath)
            }
            this.load();
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
            console.error(error.message)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className} ${this._id} Created`)

            } else {
                console.log(`👥 ${this.className} Didn't work`)
                return false
            }
        }

    }

    load() {
        this.loadAllFiles();
        this.loadConfig();
        this.loadControls();
        this.loadGearboxs();
        this.loadProfileInfo();
        this.loadSavesDir();
        this.loadSaves();
    }

    loadAllFiles() {
        const _files = fs.readdirSync(this._path);
        for (const _file of _files) {
            this._allFiles.push({
                name: _file,
                path: path.join(this._path, _file).replaceAll("\\", "/"),
            });
        }
    }

    loadConfig() {
        for (const _file of this._allFiles) {
            if (_file.name == "config.cfg") {
                this._configFile.name = _file.name;
                this._configFile.path = _file.path;
            }
        }
    }

    loadControls() {
        for (const _file of this._allFiles) {
            if (_file.name == "controls.sii") {
                this._controlsFile.name = _file.name;
                this._controlsFile.path = _file.path;
            }
        }
    }

    loadGearboxs() {
        for (const _file of this._allFiles) {
            if (_file.name.startsWith("gearbox_")) {
                this._gearboxFiles.push({
                    name: _file.name,
                    path: _file.path,
                });
            }
        }
    }

    loadSavesDir() {
        for (const _file of this._allFiles) {
            if (_file.name == "save") {
                const _Saves = fs.readdirSync(_file.path);
                for (const _save of _Saves) {
                    this._saves.push({
                        name: _save,
                        path: path.join(_file.path, _save).replaceAll("\\", "/"),
                    });
                }
            }
        }
    }

    loadSaves() {

    }

    loadProfileInfo() {

        this.method = "loadProfileInfo()"
        try {
            const _profileDetailsReadStream = fs.readFileSync(this._profileFile.profileFilePath, "utf8");
            let newData = _profileDetailsReadStream.split("\n");
            const _profileInfo = {
                active_mods: 0,
                brand: "",
                cached_discovery: 0,
                cached_distance: 0,
                cached_experience: 0,
                cached_stats: 0,
                company_name: "",
                creation_time: 0,
                customization: "",
                face: 0,
                logo: "logo_0",
                male: true,
                online_password: "",
                online_user_name: "",
                profile_name: "",
                save_time: 0,
                text: "",
                user_data: 0,
                version: 0
            }
            for (let line of newData) {
                line = line.trim().split(": ");
                let key = line[0];
                let value = line[1];
                if (line.length > 1) {
                    switch (key) {
                        case "face":
                            const face = Number(value);
                            _profileInfo.face = face;
                            break;
                        case "profile_name":
                            value = value.replaceAll('"', "");
                            const profile_name = value;
                            _profileInfo.profile_name = profile_name;
                            break;
                        case "brand":
                            const brand = value;
                            _profileInfo.brand = brand;
                            break;
                        case "company_name":
                            value = value.replaceAll('"', "");
                            const company_name = value;
                            _profileInfo.company_name = company_name;
                        case "male":
                            const male = Boolean(value);
                            _profileInfo.male = male;
                            break;
                        case "cached_experience":
                            const cached_experience = Number(value);
                            _profileInfo.cached_experience = cached_experience;
                            break;

                        case "cached_distance":
                            const cached_distance = Number(value);
                            _profileInfo.cached_distance = cached_distance;
                            break;
                        case "cached_stats":
                            const cached_stats = Number(value);
                            _profileInfo.cached_stats = cached_stats;
                            break;
                        case "cached_discovery":
                            const cached_discovery = Number(value);
                            _profileInfo.cached_discovery = cached_discovery;
                            break;
                        case "user_data":
                            const user_data = Number(value);
                            _profileInfo.user_data = user_data;
                        case "active_mods":
                            const active_mods = Number(value);
                            _profileInfo.active_mods = active_mods;
                            break;
                        case "customization":
                            const customization = Number(value);
                            _profileInfo.customization = customization;
                            break;
                        case "version":
                            const version = Number(value);
                            _profileInfo.version = version;
                            break;
                        case "online_user_name":
                            value = value.replaceAll('"', "");
                            const online_user_name = value;
                            _profileInfo.online_user_name = online_user_name;
                        case "online_password":
                            value = value.replaceAll('"', "");
                            const online_password = value;
                            _profileInfo.online_password = online_password;
                            break;
                        case "creation_time":
                            const creation_time = Number(value);
                            _profileInfo.creation_time = dateFns.fromUnixTime(creation_time)
                            break;
                        case "save_time":
                            const save_time = Number(value);
                            _profileInfo.save_time = dateFns.fromUnixTime(save_time)
                        default:
                            // console.log(info);
                            _profileInfo.text = newData;
                            break;
                    }
                }
            }
            console.log("Info : ", _profileInfo)
            console.log("Info Type: ",typeof _profileInfo)
            fs.writeFileSync(
                this._profileGeneralInfoPath,
                JSON.stringify(_profileInfo),
                {encoding: "utf-8"}
            )



            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
            console.error(error.message)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}.${this.method}`)

            } else {
                console.log(`👥 ${this.className}.${this.method} Didn't work`)
                return false
            }
        }
    }

    getId() {
        return this._id;
    }

    getFilename() {
        return this._fileName;
    }

    getProfileInfo() {
        return this._profileInfo;
    }
    getProfileName() {
        return this._profileInfo.profile_name;
    }

    getAllSaveFiles() {
        return this._savesDir;
    }
}

module.exports = Profile;