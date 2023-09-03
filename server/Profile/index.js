const fs = require("fs");
const path = require("path");
const cs = require("../../common").consoleStyle;


class Profile {
  constructor(id, fileName, pathUrl, logView = false) {
    // console.log(cs.constructorLog("Profile Created => " + fileName));
    this._id = id;
    this._fileName = fileName;
    this._path = pathUrl;
    this._execPath = pathUrl.replaceAll(" ", "_");
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
    this._savesDir = [];
    this._saves = [];
    this.load();

  }

  load() {
    this.loadAllFiles();
    this.loadConfig();
    this.loadControls();
    this.loadGearboxs();
    this.loadProfileInfo();
    this.loadSavesDir();
    this.logView ? console.log(cs.methodCommentLog("Uploaded")) : null;
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
    //console.log(cs.methodLog(this._id + " => Profile Saves Dir Loading"));
    for (const _file of this._allFiles) {
      if (_file.name == "save") {
        const _Saves = fs.readdirSync(_file.path);
        for (const _save of _Saves) {
          this._savesDir.push({
            name: _save,
            path: path.join(_file.path, _save).replaceAll("\\", "/"),
          });
        }
      }
    }
  }

  setProfileInfo(info) {
    for (let line of info) {
      line = line.trim().split(": ");
      // console.log(line);
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
            const creation_time = value;
            this._profileInfo.creation_time = creation_time;
            break;
          case "save_time":
            const save_time = value;
            this._profileInfo.save_time = save_time;
          default:
            // console.log(info);
            this._profileInfo.text = info;
            break;
        }
      }
    }
  }

  loadProfileInfo() {
    this.logView ? console.log(cs.methodLog(this._id + " => Profile Info Loading")) : null;
    const _profileDetailsReadStream = fs.readFileSync(
      this._profileFile.profileFilePath,
      "utf8"
    );
    let profileInfo;
    this.logView ? console.log(_profileDetailsReadStream) : null;
    let newData = _profileDetailsReadStream.split("\n");
    this.setProfileInfo(newData);
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