'use strict';
const {
    ipcRenderer
} = require("electron");
const path = require("path");
const Command = require(__dirname + "/common").IpcCommand;
const $ = require("jquery");

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
})
// Sidebar Rendering
$.ajax({
    url: __dirname + "/Components/windowSidebar.html",
    success: (data) => {
        $("#windowSidebar").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
})
// Titlebar Rendering
$.ajax({
    url: __dirname + "/Components/windowTitlebar.html",
    success: (data) => {
        $("#windowTitleBar").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
})
// Content Rendering
$.ajax({
    url: __dirname + "/Components/pages/home/content.html",
    success: (data) => {
        $("#windowContent").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
})
// Info Cards Rendering
$.ajax({
    url: __dirname + "/Components/pages/home/info-cards.html",
    success: (data) => {
        $("#info-cards-content").html(data);
    },
    error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
})