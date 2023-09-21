"use strict";

const IpcCommand = {
    TEST: "test",
    WINDOW_MINIMIZE: "windowed-minimize",
    WINDOW_MAXIMIZE: "windowed-maximize",
    WINDOW_CLOSE: "windowed-close",
    WINDOW_TITLE: "windowed-title",
    UPDATE_PROFILE_CARD: "update-profile-card",
    LOAD_PROFILES: "load-profiles",
    MENU_LOAD_PROFILES: "menu-load-profiles",
    LOAD_PROFILE: "load-profile",
    GET_LANG: "get-language",
    PROFILE: {
        ALL_PROFILE_COUNT: "all-profile-count",
        ALL_PROFILE_DATA: "all-profile",
        MODAL: {
            MINIMIZE: "modal-minimize",
            MAXIMIZE: "modal-maximize",
            CLOSE: "modal-close",
        }

    },
    MOD: {
        COUNT: "mod-count",
        DATA: "mod-data",
        DELETE: "mod-delete",
        ADD: "mod-add",
        MODAL: {
            MINIMIZE: "modal-minimize",
            MAXIMIZE: "modal-maximize",
            CLOSE: "modal-close",
        }
    },
    MUSIC: {
        COUNT: "music-count",
        MODAL: {
            MINIMIZE: "modal-minimize",
            MAXIMIZE: "modal-maximize",
            CLOSE: "modal-close",
        }
    },
    RADIO: {
        READY: "radio-ready",
        LOAD: "radio-load",
        COUNT: "radio-count",
        DATA: "radio-data",
        ADD: "radio-add",
        DELETE: "radio-delete",
        MODAL: {
            MINIMIZE: "modal-minimize",
            MAXIMIZE: "modal-maximize",
            CLOSE: "modal-close",
            FORM: {
                QUESTION: "radio-form-question",
                INSERT: "radio-form-insert",
                UPDATE: "radio-form-update",
                DELETE: "radio-form-delete"
            }
        }


    },
    SCREENSHOT: {
        ALL_SCREENSHOT_COUNT: "all-screenshot-count",
    },
    SAVE: {
        ALL_SAVE_COUNT: "all-save-count",
    },


};

module.exports = IpcCommand;