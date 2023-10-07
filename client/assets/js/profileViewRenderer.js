//'use strict';
const {
    ipcRenderer
} = require("electron");
const path = require("path");
const IpcCommand = require("../common/ipcCommand");
const $ = require("jquery");
const {response} = require("express");
const {log} = require("winston");


// Main Components Render

// Toolbar Rendering
$.ajax({
    url: __dirname + "/Components/windowToolbar.html", success: (data) => {
        $("#windowToolbar").html(data);
    }, error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
});

// Sidebar Rendering
$.ajax({
    url: __dirname + "/Components/windowSidebar.html", success: (data) => {
        $("#windowSidebar").html(data);
    }, error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
});

// Titlebar Rendering
$.ajax({
    url: __dirname + "/Components/windowTitlebar.html", success: (data) => {
        $("#windowTitleBar").html(data);
    }, error: (error) => {
        console.log(`Not found: \n ${error.responseText}`);
    }
});
// Content Rendering
const profileID = document.location.href.split("?id=")[1]
ipcRenderer.send(IpcCommand.GET_LANG);
ipcRenderer.on(IpcCommand.GET_LANG, (event, response) => {
    const pageName = window.location.href.split('/').pop().split('.')[0];
    const locale = response[pageName]
    for (const key in locale) {
        if (key === "title") {
            document.title = locale.title + profileID;
        } else if (key === "description") {
            $("meta[name='description']").attr("content", locale.description);
        } else {
            $("#" + key).html(locale[key])
        }
    }
});

ipcRenderer.send(IpcCommand.PROFILE.GET_PROFILE, profileID)
ipcRenderer.on(IpcCommand.PROFILE.GET_PROFILE, (event, response) => {
    $('#profileView-value').html(response._profileInfo.profile_name)
    for (const responseElement in response._profileInfo) {
        console.log(responseElement, ": ", response._profileInfo[responseElement])
        if (responseElement === "text" || responseElement === "face") {
            continue
        } else {
            if (response._profileInfo[responseElement] !== undefined) {
                html = `<tr>
<th class="text-dark text-uppercase">${responseElement.replaceAll("_"," ")} :</th> <td class="text-dark text-uppercase">${response._profileInfo[responseElement]}</td>
</tr>`
                $("#v-pills-profile-table > tbody").append(html)
            }
            else {
                continue
            }

        }

    }


})
