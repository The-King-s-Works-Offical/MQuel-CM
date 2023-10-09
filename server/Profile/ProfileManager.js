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
                //console.log(`👥 ${this.className}`)
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
                console.log(`👥 ${this.className}.${this.method} Crashed !`)
            }
        }
    }

    profilesSystemLoad = () => {

        const _profileDirs = fs.readdirSync(this._profilesGamesPath);

        for (const _profile of _profileDirs) {
            const _pro = new Profile(_profile, _profile, path.join(this._profilesGamesPath, _profile), false);
            //this.profiles.push(_pro);
        }
    }

    // Profiles Count Value
    getCount = () => {
        this.method = "getCount()"
        try {
            const _profiles = fs.readdirSync(this._profilesSystempPath)
            const _profilesCount = _profiles.length
            this.result = true
            return _profilesCount
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

    // Single Profile Info Details File Data
    getProfileAllInfo = (profileInfoFile) => {
        this.method = "getInfo( profileInfoFile )"
        try {
            let result
            if (fs.existsSync(profileInfoFile)) {
                const readFileReturn = fs.readFileSync(profileInfoFile, {encoding: "utf-8"})
                result = JSON.parse(readFileReturn)
            } else {
                console.error(profileInfoFile + " not found")
            }
            this.result = true
            return result
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                //console.log(`👥 ${this.className}.${this.method}`)
            } else {
                console.error(`👥 ${this.className}.${this.method} Didn't work`)
            }
        }
    }

    // All Profiles List
    getAll = () => {

        this.method = "getAll()"
        try {
            const resultList = []
            const _profiles = fs.readdirSync(this._profilesSystempPath)

            _profiles.forEach((profile, index) => {
                const _profileItem = {}
                _profileItem.id = profile
                _profileItem.info = this.getProfileAllInfo(path.join(this._profilesSystempPath, profile, "info.json"))
                resultList.push(_profileItem)
            });
            this.result = true
            return resultList;
        } catch (error) {
            this.result = false
            console.error(error)
        } finally {
            if (this.result) {
                //console.log(`👥 ${this.className}.${this.method}`)
            } else {
                console.log(`👥 ${this.className}.${this.method} Didn't work`)
            }
        }
    }
    // Single Profile
    getProfile = (profileId) => {
        this.method = "getProfile( profileId )"
        try {
            let resultProfile = null
            const _profiles = fs.readdirSync(this._profilesSystempPath)
            _profiles.forEach((profile, index) => {
                if (profile === profileId) {
                    /*
                    const _profileItem = {}
                     _profileItem.id = profile
                     const info = this.getProfileAllInfo(path.join(this._profilesSystempPath, profile, "info.json"))
                     _profileItem.info = info
                     console.log(_profileItem)
                     console.log("Profile :", _profileItem, " Added !")
                     resultList.push(_profileItem)
                     */
                    const _profileItem = {}
                    _profileItem.id = profile
                    _profileItem.info = this.getProfileAllInfo(path.join(this._profilesSystempPath, profile, "info.json"))
                    resultProfile = _profileItem;
                }
            })
            this.result = true
            return resultProfile
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