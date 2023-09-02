class Save {
    constructor(id, name, path) {
        this._id = id;
        this._fileName = name;
        this._path = path;
        this._allFiles = [];
        this._gameFile = {
            name: "",
            path: "",
        };
        this._infoFile = {
            name: "",
            path: "",
        };
        this._previewFile = {
            name: "",
            path: "",
        };
        this._bank = {
            money_account: 193969,
        }
        this._player = {
            hq_city: "roma",
            trailers: 0,
            trailer_utilization_logs: 0,
            trailer_defs: 0,
            assigned_truck: "_truck1",
            my_truck: this._player.my_truck,
            assigned_trailer: "_trailer1",
            my_trailer: this._player.assigned_trailer,


        }
    }
}