"use strict";

const {
    ipcRenderer,
} = require("electron");
const path = require("path");
const IpcCommand = require("../../common/ipcCommand");
const $ = require("jquery");
const url = require("url");

console.log(IpcCommand)
const RADIO_COMMAND = IpcCommand.RADIO;

ipcRenderer.send(IpcCommand.GET_LANG);
ipcRenderer.on(IpcCommand.GET_LANG, (event, response) => {
    const pageName = window.location.href.split('/').pop().split('.')[0];
    const locale = response[pageName]
    for (const key in locale) {
        if (key === "title") {
            document.title = locale.title;
            $("#page-title").text(locale.title)
        } else if (key === "description") {
            $("meta[name='description']").attr("content", locale.description);
        } else {
            $(`#${key}`).html(locale[key]);
            //document.getElementById(key).innerText = locale[key];
        }
    }
});
const minimizeModal = () => ipcRenderer.send(RADIO_COMMAND.MODAL.MINIMIZE, true)
const maximizeModal = () => ipcRenderer.send(RADIO_COMMAND.MODAL.MAXIMIZE, true)
const closeModal = () => ipcRenderer.send(RADIO_COMMAND.MODAL.CLOSE, true)


console.log("Radio Add Panel Ready")