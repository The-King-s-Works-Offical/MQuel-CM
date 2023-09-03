
const fs = require("fs");
const path = require("path");


// User Modules
const Profile = require("../Profile/index"); // Class
const ConfigManager = require("../Config/index"); // Class

class ProfileManager {
  constructor(logView) {


    this._config = new ConfigManager()
    this.path = this._config.documentsPath + "/profiles/";
    this.profiles = [];
    this.profilesLoad();

  }
  profilesLoad() {
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
    for (const _profile of this.profiles) {
      if (_profile._id === profileId) {
        return _profile;
      }
    }
  }

  getAll() {
    return this.profiles;
  }
  getProfilesName() {
    const list = [];
    for (const _profile of this.profiles) {
      list.push(_profile._profileInfo.profile_name);
    }
    return list;
  }
  getCount() {
    const files = fs.readdirSync(this.path);


    return files.length;
  }
}

module.exports = ProfileManager;