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
  SET_LOCALSTORAGE: "set-local-storage",
  GET_LOCALSTORAGE: "get-local-storage",
  REMOVE_LOCALSTORAGE: "remove-local-storage",
  CLEAR_LOCALSTORAGE: "clear-local-storage",
};

module.exports = IpcCommand;