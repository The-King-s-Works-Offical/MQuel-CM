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
  GET_PROFILE_COUNT : "get-profiles-count",
  GET_MOD_COUNT : "get-mods-count",
  GET_MUSIC_COUNT : "get-musics-count",
  GET_RADIO_COUNT : "get-radios-count",
  GET_SCREENSHOT_COUNT : "get-screenshot-count",
};

module.exports = IpcCommand;