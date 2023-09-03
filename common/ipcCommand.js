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
    ALL_PROFILE_DATA: "all-profile"
  },
  MOD: {
    ALL_MOD_COUNT: "all-mod-count",
    ALL_MOD_DATA : "all-mod",
    MOD_DELETE : "mod-delete"
  },
  MUSIC: {
    ALL_MUSIC_COUNT: "all-music-count",
  },
  RADIO: {
    ALL_RADIO_COUNT: "all-radio-count",
  },
  SCREENSHOT: {
    ALL_SCREENSHOT_COUNT: "all-screenshot-count",
  },
  SAVE: {
    ALL_SAVE_COUNT: "all-save-count",
  }

};

module.exports = IpcCommand;