//'use strict';
const {
    ipcRenderer
} = require("electron");
const path = require("path");
const IpcCommand = require("../common/ipcCommand");
const $ = require("jquery");

console.table(IpcCommand)

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
const CMD = IpcCommand.GAME_CONFIG
ipcRenderer.send(CMD.LOAD);
ipcRenderer.on(CMD.LOAD, (event, response) => {

    let count = 0
    response.forEach((data, index) => {
        console.log(index, " | ", data)
        const key = data.key
        const wroth = data.value
        html = ` 
         <div class="card col-4 bg-dark-subtle">
            <div class="card-body">
                <div class="form-group">
                    <label for="${key}-input" class="mb-2 text-uppercase">${key}</label>
                    <input type="number" class="form-control" name="${key}" id="${key}-input" aria-describedby="${key}Help" placeholder="0,0" max="
                    10" value="${wroth}">
                </div>
            </div>
        </div>
          
 `
        $("#game-config-form-list").append(html)
        count++
    })
    console.log("count: ", count)
})


const game_config_submit = (event) => {
    formData = $("#game-config-form").serializeArray()
    console.log(formData)
    ipcRenderer.send(CMD.SAVE,formData)
    console.log(event)
    event.preventDefault()
}
