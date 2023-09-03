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
ipcRenderer.send(IpcCommand.MOD.ALL_MOD_DATA, true)
ipcRenderer.on(IpcCommand.MOD.ALL_MOD_DATA, (event, response) => {
    response.forEach((element, index) => {
        $("#mod-table-list").append(`
    <tr class="pt-5">
        <td class="text-center"> 
            <div class="form-check bg-transparent">
                <input class="form-check-input" type="checkbox" value="${element.name}" id="${element.name}${index}">
                <label class="form-check-label text-white" for="${element.name}${index}">
                    ${index}
                </label>
            </div>
        </td>
        <td> ${element.name} </td>
        <td> ${element.file} </td>
        <td> ${element.path} </td>
        <td  > 
            <button class="btn form-control border-0 shadow-lg text-white bg-danger">
                <i class="fa-solid fa-trash"></i>
            </button> 
        </td>
    </tr>
    `)
    });

})