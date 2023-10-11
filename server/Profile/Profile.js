const fs = require("fs");
const path = require("path");
const dateFns = require("date-fns");
const ConfigManager = require("../Config")

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
            this._baseGamesProfilePathList = {
                _profileDir: this._path
            }

            this._baseApplicationRoamingProfilePathList = {
                _profileDir: path.join(this._baseApplicationRoamingFile, "Profiles", fileName),
                _profileInfoJson: path.join(this._baseApplicationRoamingFile, "Profiles", fileName, "info.json"),
                _profileSaveDir: path.join(this._baseApplicationRoamingFile, "Profiles", fileName, "Saves")
            }
            if (!fs.existsSync(this._baseApplicationRoamingProfilePathList._profileDir)) {
                fs.mkdirSync(this._baseApplicationRoamingProfilePathList._profileDir)
            }

            console.log(this._baseGamesProfilePathList)
            console.log(this._baseApplicationRoamingProfilePathList)


            this.load();
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
            console.error(error.message)
        } finally {
            if (this.result) {
                //console.log(`👥 ${this.className} ${this._id} Created`)

            } else {
                console.log(`👥 ${this.className} Didn't work`)

            }
        }

    }

    load() {
        // this.loadAllFiles();
        // this.loadConfig();
        // this.loadControls();
        // this.loadGearboxs();
        this.loadProfileInfo();
        this.loadSaves();
    }
    loadSaves() {
        this.method = "loadSaves()"
        try {
            const gamelog_txt = []
            const gameLog = (log) => {

            }
            const game = (basePath, gamePath) => {
                const _dir = basePath
                const _sii = gamePath
                const saveDataFiles = {
                    economy_data: path.join(_dir, "economy.json")
                }

                const _game_sii_reading_stream = fs.readFileSync(_sii, {encoding: "utf-8"})
                let _stream_lines = _game_sii_reading_stream.split("\n")
                _stream_lines = _stream_lines.slice(2)


                const _game_sii_data_json = []
                console.log("_stream_lines length => ", _stream_lines.slice(0).length)
                console.log("_stream_lines length -2 => ", _stream_lines.slice(2).length)
                const Lines = _stream_lines
                let count = -1
                while (count < Lines.length) {
                    const _game_sii_data_item = {
                        tag: "", value: "", start_index: 0, end_index: 0
                    }

                    let line = Lines[count]
                    //

                    if (line === undefined) {

                    } else {
                        line = line.replaceAll("\r", "")
                        line = line.split(" ")
                        console.log("Lenght :",line.length," => ",line)
                        /*
                        if (line.length === 4) {
                            console.log(" => ", line)
                            //_game_sii_data_item.startIndex = count
                            //_game_sii_data_item.tag = line.split(" ")[0]
                            //_game_sii_data_item.value = line.split(" ")[2]
                        } else {

                        }
                        */


                        //_game_sii_data_json.push(_game_sii_data_item)
                    }
                    count++

                }

                //console.log(_game_sii_data_json)
                console.log("_________________________________________________________________________________")
            }
            const info = (infoPath) => {
            }

            if (!fs.existsSync(this._baseApplicationRoamingProfilePathList._profileSaveDir)) {
                fs.mkdirSync(this._baseApplicationRoamingProfilePathList._profileSaveDir)
            }

            const readDirReturnList = fs.readdirSync(path.join(this._path,"save"))
            readDirReturnList.forEach((dir, dirIndex) => {

                if (!fs.existsSync(path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir))) {
                    fs.mkdirSync(path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir))
                    console.log("Dirs Created !")
                }

                console.log(this._id, dir)
                const saveFiles = fs.readdirSync(path.join(this._path, "save", dir))
                saveFiles.forEach((file, fileIndex) => {
                    if (!fs.existsSync(path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir, file))) {
                        fs.copyFileSync(path.join(this._path, "save", dir, file), path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir, file), 1)
                    }

                    if (file == "game.sii") {
                        game(path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir), path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir, file))
                    } else if (file === "info.sii") {
                        info(path.join(this._baseApplicationRoamingProfilePathList._profileSaveDir, dir, file))
                    }
                })


            })

            this.result = true
        } catch
            (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}.${this.method}`)
                console.log(this._baseApplicationRoamingProfilePathList)
            } else {
                console.error(`👥 ${this.className}.${this.method} Didn't work`)
            }
        }
    }
    loadProfileInfo() {

        this.method = "loadProfileInfo()"
        try {
            const _profileDetailsReadStream = fs.readFileSync(this._profileFile.profileFilePath, "utf8");
            let newData = _profileDetailsReadStream.split("\n");
            const _profileInfo = {
                active_mods: 0, active_mods_list: [],
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
                    if (key.startsWith("active_mods[")) {

                        value = value.replaceAll('"', "").split("|")[1];

                        _profileInfo.active_mods_list.push(value)
                    }
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
            fs.writeFileSync(this._baseApplicationRoamingProfilePathList._profileInfoJson,
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
                // console.log(`👥 ${this.className}.${this.method}`)

            } else {
                console.log(`👥 ${this.className}.${this.method} Didn't work`)
                return false
            }
        }
    }

    /*
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
    */

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