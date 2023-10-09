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
    console.log(response)
    const tableRenderer = (documenTagId, key, data) => {
        html = `<tr>
        <th class="text-dark text-uppercase">${key.replaceAll("_", " ")} :</th> 
        <td class="text-dark text-uppercase">${data}</td>
    </tr>`
        //v-pills-profile-table > tbody
        $(`#${documenTagId}`).append(html)
    }
    $('#profileView-value').html(response.info.profile_name)
    for (const responseElement in response.info) {
        if (responseElement === "text" || responseElement === "face") {
            continue
        } else {
            if (response.info[responseElement] !== undefined) {
                console.log(responseElement, ": ", response.info[responseElement])
                switch (responseElement) {
                    case "active_mods":
                        tableRenderer("v-pills-profile-table > tbody", responseElement, response.info[responseElement])
                        break
                    case "active_mods_list":
                        if (response.info.active_mods_list.length > 0) {
                            response.info.active_mods_list.forEach((mod, index) => {
                                html = `<tr>
                            <th class="text-dark text-uppercase">${index} :</th> 
                            <td class="text-dark text-uppercase">${mod}</td>
                            </tr>`
                                $("#v-pills-mods-table > tbody").append(html)
                            })
                        } else {
                            html = `<tr>
                            <th class="text-dark text-uppercase">Status :</th> 
                            <td class="text-dark text-uppercase">Active Mode Not Found!</td>
                            </tr>`
                            $("#v-pills-mods-table > tbody").append(html)
                        }
                        break
                    case "brand":
                        tableRenderer("v-pills-profile-table > tbody", responseElement, response.info[responseElement])
                        break
                    case "company_name":
                        tableRenderer("v-pills-profile-table > tbody", responseElement, response.info[responseElement])
                        break
                    case "creation_time":
                        tableRenderer("v-pills-profile-table > tbody", responseElement, response.info[responseElement])
                        break
                    case "save_time":
                        tableRenderer("v-pills-profile-table > tbody", responseElement, response.info[responseElement])
                        break
                    case "online_user_name":
                        if (response.info[responseElement] !== "") {
                            html = `<tr>
                            <th class="text-dark text-uppercase">Status :</th> 
                            <td class="text-dark text-uppercase">
                                <span class="badge p-3 text-bg-success" style="font-size: 15px"> Active </span>
                            </td>
                            </tr>`
                            $("#v-pills-online-table > tbody").append(html)
                        } else {
                            html = `<tr>
                            <th class="text-dark text-uppercase">Status :</th> 
                            <td class="text-dark text-uppercase">
                                <span class="badge p-3 text-bg-danger" style="font-size: 15px">Inactive</span>
                            </td>
                            </tr>`
                            $("#v-pills-online-table > tbody").append(html)
                        }

                        break
                }
            }
            else {
                continue
            }

        }

    }
    /*
    html = `<tr>
        <th class="text-dark text-uppercase">${responseElement.replaceAll("_"," ")} :</th> <td class="text-dark text-uppercase">${response.info[responseElement]}</td>
    </tr>`
                $("#v-pills-profile-table > tbody").append(html)
     */

})
