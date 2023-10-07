const fs = require("fs");
const path = require("path");
const dateFns = require("date-fns");
const ConfigManager = require("../Config")

class Profile {

    constructor(id, fileName, pathUrl) {
        const cM = new ConfigManager()
        cM.load()
        this.className = "Profile"
        this.method = ""
        this.console = ""
        this.result = Boolean
        this._id = id;
        this._fileName = fileName;
        this._path = pathUrl;


        this._profileInfo = {
            text: "",
            face: 0,
            profile_name: "",
            brand: "",
            logo: "logo_0",
            company_name: "",
            male: true,
            cached_experience: 0,
            cached_distance: 0,
            user_data: 0,
            active_mods: 0,
            customization: "",
            cached_stats: 0,
            cached_discovery: 0,
            version: 0,
            online_user_name: "",
            online_password: "",
            creation_time: 0,
            save_time: 0,
        };
        this._profileFile = {
            name: fileName,
            path: pathUrl.replaceAll("\\", "/"),
            profileFilePath: pathUrl.replaceAll("\\", "/") + "/profile.sii",
        };
        this._allFiles = [];
        this._configFile = {
            name: "",
            path: "",
        };
        this._controlsFile = {
            name: "",
            path: "",
        };
        this._gearboxFiles = [];

        this._saves = [];


        try {

            this._profileGeneralPath = path.join(cM.getPaths().application_file, "Profiles", fileName)
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
                console.log(`👥 ${this.className}`)

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

    setProfileInfo(info) {

    }

    loadProfileInfo() {

        this.method = "loadProfileInfo()"
        try {
            const _profileDetailsReadStream = fs.readFileSync(this._profileFile.profileFilePath, "utf8");
            let profileInfo;
            let newData = _profileDetailsReadStream.split("\n");

            for (let line of newData) {
                line = line.trim().split(": ");
                let key = line[0];
                let value = line[1];
                if (line.length > 1) {
                    switch (key) {
                        case "face":
                            const face = Number(value);
                            this._profileInfo.face = face;
                            break;
                        case "profile_name":
                            value = value.replaceAll('"', "");
                            const profile_name = value;
                            this._profileInfo.profile_name = profile_name;
                            break;
                        case "brand":
                            const brand = value;
                            this._profileInfo.brand = brand;
                            break;
                        case "company_name":
                            value = value.replaceAll('"', "");
                            const company_name = value;
                            this._profileInfo.company_name = company_name;
                        case "male":
                            const male = Boolean(value);
                            this._profileInfo.male = male;
                            break;
                        case "cached_experience":
                            const cached_experience = Number(value);
                            this._profileInfo.cached_experience = cached_experience;
                            break;

                        case "cached_distance":
                            const cached_distance = Number(value);
                            this._profileInfo.cached_distance = cached_distance;
                            break;
                        case "cached_stats":
                            const cached_stats = Number(value);
                            this._profileInfo.cached_stats = cached_stats;
                            break;
                        case "cached_discovery":
                            const cached_discovery = Number(value);
                            this._profileInfo.cached_discovery = cached_discovery;
                            break;
                        case "user_data":
                            const user_data = Number(value);
                            this._profileInfo.user_data = user_data;
                        case "active_mods":
                            const active_mods = Number(value);
                            this._profileInfo.active_mods = active_mods;
                            break;
                        case "customization":
                            const customization = Number(value);
                            this._profileInfo.customization = customization;
                            break;
                        case "version":
                            const version = Number(value);
                            this._profileInfo.version = version;
                            break;
                        case "online_user_name":
                            value = value.replaceAll('"', "");
                            const online_user_name = value;
                            this._profileInfo.online_user_name = online_user_name;
                        case "online_password":
                            value = value.replaceAll('"', "");
                            const online_password = value;
                            this._profileInfo.online_password = online_password;
                            break;
                        case "creation_time":
                            const creation_time = Number(value);
                            this._profileInfo.creation_time = dateFns.fromUnixTime(creation_time)
                            break;
                        case "save_time":
                            const save_time = Number(value);
                            this._profileInfo.save_time = dateFns.fromUnixTime(save_time)
                        default:
                            // console.log(info);
                            this._profileInfo.text = info;
                            break;
                    }
                }
            }
            console.log(newData)


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