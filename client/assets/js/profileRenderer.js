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
const CMD = IpcCommand.PROFILE
ipcRenderer.send(CMD.LOAD, true);

ipcRenderer.on(CMD.LOAD, (event, response) => {

    response.forEach((profile, index) => {
        console.log(profile);
        html = ` 
        <div class="col col-6">
            <div class="card text-start my-1 shadow shadow-lg ${index % 2 == 0 ? "" : "bg-dark text-white"}">
                <div class="card-header d-flex pt-3">
                    <h5 class="card-title" id="profileNameValue">
                        <i class="fa-solid fa-user mx-2"></i> ${profile._profileInfo.profile_name ? profile._profileInfo.profile_name : profile._id }
                    </h5>
                </div>
                <div class="card-body mx-2">
                   <table class="table table-striped table-responsive ${index % 2 == 0 ? "" : "table-dark"}">
                        <tr>
                            <th>Creation Time</th> <td>${profile._profileInfo.creation_time}</td>
                        </tr>
                   		<tr>
                   			<th>Company Name</th>
                   			<th>Truck Brand</th>
                   		</tr>
             			<tr  class="text-uppercase">
            				<td class="ps-3"> ${profile._profileInfo.company_name} </td>
                   			<td class="ps-3"> ${profile._profileInfo.brand.replaceAll("_", " ")} </td>
                   		</tr>
                   		 <tr>
                   		    <th>Active Mods</th>
                   		    <th>Actions</th>
                   		 </tr class="text-uppercase">
                   		    <td class="ps-3"> ${profile._profileInfo.active_mods} </td>
                   		    <td><a href="profileView.html?id=${profile._id}">View</a> </td>
                   		 <tr>
                   </table>
                </div>
            </div>
        </div>
`;
        $("#profile-card-list").append(html)
    });
});