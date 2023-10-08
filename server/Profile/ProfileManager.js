const fs = require("fs");
const path = require("path");


// User Modules
const Profile = require("./Profile"); // Class
const ConfigManager = require("../Config"); // Class

class ProfileManager extends ConfigManager {
    constructor() {
        super()

        this.className = "Profile Manager"
        this.method = ""
        this.result = Boolean

        try {
            this._profilesSystempPath = path.join(this._baseApplicationRoamingFile, "Profiles")
            this._profilesGamesPath = path.join(this._gameDocuments, "Profiles")
            this.result = true
        } catch (error) {
            this.result = false
            console.error(error)
            console.error(error.message)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}`)
                console.log(this)
            } else {
                console.log(`👥 ${this.className} Didn't work`)
                return;
            }
        }
    }

    init = () => {
        this.method = "init()"
        try {
            const _profilesDirExists = fs.existsSync(this._profilesSystempPath)
            if (!_profilesDirExists) {
                fs.mkdirSync(this._profilesSystempPath)
            }

            this.profilesSystemLoad();
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
    profilesSystemLoad = () => {

        const _profileDirs = fs.readdirSync(this._profilesGamesPath);

        for (const _profile of _profileDirs) {
            const _pro = new Profile(_profile, _profile, path.join(this._profilesGamesPath, _profile), false);
            // this.profiles.push(_pro);
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
            //return this.profiles;
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
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                console.log(`👥 ${this.className}.${this.method}`)
                console.log(this)
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