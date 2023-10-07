const fs = require("fs");
const path = require("path");


// User Modules
const Profile = require("./Profile"); // Class
const ConfigManager = require("../Config"); // Class

class ProfileManager {
    constructor() {
        this.className = "Profile Manager"
        this.method = ""
        this.result = Boolean
        this.profiles = [];

        try {
            const cM = new ConfigManager()
            cM.load()
            this._paths = cM.getPaths()
            this.path = this._paths.profiles_directory
            const _profilesDirExists = fs.existsSync(path.join(cM.getPaths().application_file, "Profiles"))
            if (!_profilesDirExists) {
                fs.mkdirSync(path.join(cM.getPaths().application_file, "Profiles"))
            }
            this.profilesLoad();
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
            console.error(error.message)
        } finally {
            if (this.result) {
                // console.log(`👥 ${this.className}`)
            } else {
                console.log(`👥 ${this.className} Didn't work`)
                return false
            }
        }
    }

    init = () => {
        this.method = "init()"
        try {

            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}.${this.method}`)
            } else {
                console.log(`👥 ${this.className}.${this.method} Didn't work`)
            }
        }
    }
    profilesLoad = () => {
        const _profileDirs = fs.readdirSync(this.path);

        for (const _profile of _profileDirs) {
            const _pro = new Profile(_profile, _profile, path.join(this.path, _profile), false);
            this.profiles.push(_pro);
        }
    }

    getProfile = (profileId) => {
        for (const _profile of this.profiles) {
            if (_profile._id === profileId) {
                return _profile;
            }
        }
    }

    getAll = () => {

        this.method = "getAll()"
        try {
            this.result = true
            return this.profiles;
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}.${this.method}`)
            } else {
                console.log(`👥 ${this.className}.${this.method} Didn't work`)
            }
        }
    }

    getProfilesName = () => {
        const list = [];
        for (const _profile of this.profiles) {
            list.push(_profile._profileInfo.profile_name);
        }
        return list;
    }

    getCount = () => {
        this.method = "getCount()"
        try {
            this.result = true
            return this.profiles.length;
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}.${this.method}`)
            } else {
                console.log(`👥 ${this.className}.${this.method} Didn't work`)
            }
        }
    }
}

/*
    this.method = "load()"
    try {

      this.result = true
    } catch (error) {
      this.result = false
      console.error(error)
    } finally {
      if (this.result) {
        console.log(`👥 ${this.className}.${this.method}`)
      } else {
        console.log(`👥 ${this.className}.${this.method} Didn't work`)
      }
    }
        */

module.exports = ProfileManager;