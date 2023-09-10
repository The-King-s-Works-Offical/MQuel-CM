//'use strict';
const {
    ipcRenderer
} = require("electron");
const path = require("path");
const IpcCommand = require("../common/ipcCommand");
const $ = require("jquery");

console.log(IpcCommand)

// Main Components Render
// Toolbar Rendering
$.ajax({
    url: __dirname + "/Components/windowToolbar.html",
    success: (data) => {
        $("#windowToolbar").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
});
// Sidebar Rendering
$.ajax({
    url: __dirname + "/Components/windowSidebar.html",
    success: (data) => {
        $("#windowSidebar").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
});
// Titlebar Rendering
$.ajax({
    url: __dirname + "/Components/windowTitlebar.html",
    success: (data) => {
        $("#windowTitleBar").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
});
// Content Rendering

ipcRenderer.send(IpcCommand.GET_LANG);
ipcRenderer.on(IpcCommand.GET_LANG, (event, response) => {
    const pageName = window.location.href.split('/').pop().split('.')[0];
    const locale = response[pageName]
    for (const key in locale) {
        if (key === "title") {
            document.title = locale.title;
        } else if (key === "description") {
            $("meta[name='description']").attr("content", locale.description);
        } else {
            document.getElementById(key).innerText = locale[key];
        }
    }
});
// Profile Count
ipcRenderer.send(IpcCommand.PROFILE.ALL_PROFILE_COUNT, true)
ipcRenderer.on(IpcCommand.PROFILE.ALL_PROFILE_COUNT, (event, response) => {
    document.getElementById('profile-count-value').innerText = response;
    document.getElementById('profile-count-value').classList.add('fa-2x');
});
// Mods Count
ipcRenderer.send(IpcCommand.MOD.ALL_MOD_COUNT, true);
ipcRenderer.on(IpcCommand.MOD.ALL_MOD_COUNT, (event, response) => {
    document.getElementById('mod-count-value').innerText = response;
    document.getElementById('mod-count-value').classList.add('fa-2x');
});
// Music Count
ipcRenderer.send(IpcCommand.MUSIC.ALL_MUSIC_COUNT, true);
ipcRenderer.on(IpcCommand.MUSIC.ALL_MUSIC_COUNT, (event, response) => {
    document.getElementById('music-count-value').innerText = response;
    document.getElementById('music-count-value').classList.add('fa-2x');
});
// Radio Count
ipcRenderer.send(IpcCommand.RADIO.LOAD,true)
ipcRenderer.send(IpcCommand.RADIO.COUNT, true);
ipcRenderer.on(IpcCommand.RADIO.COUNT, (event, response) => {
    document.getElementById('radio-count-value').innerText = response;
    document.getElementById('radio-count-value').classList.add('fa-2x');
})
// ScreenShot Count
ipcRenderer.send(IpcCommand.SCREENSHOT.ALL_SCREENSHOT_COUNT, true);
ipcRenderer.on(IpcCommand.SCREENSHOT.ALL_SCREENSHOT_COUNT, (event,response) => {
    document.getElementById('screenshot-count-value').innerText = response;
    document.getElementById('screenshot-count-value').classList.add('fa-2x');
});
