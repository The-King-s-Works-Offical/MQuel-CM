'use strict';
const {
    ipcRenderer
} = require("electron");
const path = require("path");
const IpcCommand = require(__dirname + "/common").IpcCommand;
const $ = require("jquery");


ipcRenderer.send(IpcCommand.GET_PROFILE_COUNT, true)
ipcRenderer.on(IpcCommand.GET_PROFILE_COUNT, () => {

});

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