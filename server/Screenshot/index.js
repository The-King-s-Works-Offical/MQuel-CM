const fs = require("fs");
const path = require("path");

const ConfigManager = require("../Config/index");


class ScreenShotManager {
    constructor() {
        this._config = new ConfigManager();
        this._path = path.join(this._config.documentsPath, "screenshot");
        this._screenshotList = [];

        const images = fs.readdirSync(this._path)
        for (const image of images) {

            let imageTitle = image.split(".")[0].split("_")
            let imageTag = imageTitle[0]

            let imageDate = imageTitle[1]
            const imageDateYear = imageDate.slice(0, 4);
            const imageDateMonth = imageDate.slice(4, 6);
            const imageDateDay = imageDate.slice(6, 8);

            let imageTime = imageTitle[2]
            const imageTimeHours = imageTime.slice(0, 2);
            const imageTimeMinutes = imageTime.slice(2, 4);
            const imageTimeSeconds = imageTime.slice(4, 6);

            const img = {
                tag: imageTag,
                date: `${imageDateDay}/${imageDateMonth}/${imageDateYear}`,
                time: `${imageTimeHours}:${imageTimeMinutes}:${imageTimeSeconds}`,
                file: this._path + '/' + image
            }

            this._screenshotList.push(img);

        }
    }

    getCount() {

        return this._screenshotList.length;
    }
    getAll() {
        return this._screenshotList
    }


}

module.exports = ScreenShotManager;