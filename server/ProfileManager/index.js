const {
  ipcRenderer,
  ipcMain
} = require("electron");
const fs = require("fs");
const path = require("path");
const {
  exec
} = require("child_process");

// User Modules
const Profile = require("../Profile/index"); // Class
const cs = require("../../consoleStyle"); // Class
const ConfigManager = require("../Config/index"); // Class
const {
  Console
} = require("winston/lib/winston/transports");

class ProfileManager {
  constructor(logView) {
    this.logView = logView || false;
    this.logView ? console.log(cs.constructorLog("Profiles Manager")) : null;


    this._config = new ConfigManager()
    this.path = this._config.documentsPath + "/profiles/";
    this.profiles = [];
    this.profilesLoad();

  }
  profilesLoad() {
    this.logView ? console.log(cs.methodLog("Profiles Manager => Profiles Loading")) : null;
    const _profileDirs = fs.readdirSync(this.path);

    for (const _profile of _profileDirs) {
      const _pro = new Profile(
        _profile,
        _profile,
        path.join(this.path, _profile), false
      );
      this.profiles.push(_pro);
    }
  }

  getProfile(profileId) {
    this.logView ? console.log(cs.methodLog("getProfile  contrustor")) : null
    for (const _profile of this.profiles) {
      if (_profile._id === profileId) {
        return _profile;
      }
    }
  }

  getProfiles() {
    this.logView ? console.log(cs.methodLog("Profiles Manager => getProfiles()")) : null
    return this.profiles;
  }
  getProfilesName() {
    const list = [];
    for (const _profile of this.profiles) {
      list.push(_profile._profileInfo.profile_name);
    }
    return list;
  }
  getProfilesCount() {
    this.logView ? console.log(cs.methodLog("Profiles Manager => getProfilesCount()")) : null
    const files = fs.readdirSync(this.path);

    this.logView ? console.log(cs.methodCommentLog("Profile Count :" + files.length)) : null

    return files.length;
  }
}

module.exports = ProfileManager;