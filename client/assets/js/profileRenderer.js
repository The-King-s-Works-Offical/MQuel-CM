//'use strict';
const {
    ipcRenderer
} = require("electron");
const path = require("path");
const IpcCommand = require("../common/ipcCommand");
const $ = require("jquery");
const { log } = require("console");

console.table(IpcCommand)

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

ipcRenderer.send(IpcCommand.PROFILE.ALL_PROFILE_DATA, true);

ipcRenderer.on(IpcCommand.PROFILE.ALL_PROFILE_DATA, (event, response) => {
    console.log(response);
    response.forEach((element, index) => {
        console.log(element);
        console.log(element._profileInfo);
        const profileNameValue = element._profileInfo.profile_name
        html = ` 
        <div class="card col text-start my-1 shadow shadow-lg ${index % 2 == 0 ? "" : "bg-dark text-white"}">
            <div class="card-header d-flex pt-3">
                <h5 class="card-title" id="profileNameValue">
                    <i class="fa-solid fa-user mx-2"></i> ${profileNameValue}
                </h5>
            </div>
            <div class="card-body mx-2">
                Card Body
            </div>
        </div>
`;
        $("#profile-card-list").append(html)
    });
});