const {
    ipcRenderer,
} = require("electron");
const IpcCommand = require("../common/ipcCommand");
const $ = require("jquery");

//console.log(IpcCommand)

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
            $(`#${key}`).html(locale[key]);
            //document.getElementById(key).innerText = locale[key];
        }
    }
});
ipcRenderer.send(IpcCommand.RADIO.DATA, true)
ipcRenderer.on(IpcCommand.RADIO.DATA, (event, response) => {
    const code = response.status
    if (code === 404) {
        console.error(response);
        console.error(response.message);
    }
    if (code === 200) {
        response.data.forEach(live_stream => {
            html = `<div class="accordion-item">
            <h2 class="accordion-header d-flex align-items-center" id="ac-flush-collapse${live_stream.index}">
              <div class="form-check form-switch ms-3">
                <input class="form-check-input bg-dark" name="stream_id" id="stream_id" type="checkbox" value="${live_stream.id}" aria-label="Text for screen reader">
              </div>
              <button class="accordion-button collapsed "  type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapse${live_stream.index}" aria-expanded="false" aria-controls="flush-collapse${live_stream.index}">
                <i class="fa-solid fa-radio me-3"></i> ${live_stream.name}
              </button>
              
            </h2>
            <div id="flush-collapse${live_stream.index}" class="accordion-collapse collapse"
              data-bs-parent="#radio-list-accordionFlush">
              <div class="accordion-body">
                 <table class="table w-100">
                    <tr>
                        <th> ID : </th> <td> ${live_stream.id} </td>
                        <th> Index : </th> <td> ${live_stream.index} </td>
                    </tr>
                    <tr>
                        <th> Name : </th> <td> ${live_stream.name} </td>
                        <th> Type : </th> <td> ${live_stream.type} </td>
                    </tr>
                    <tr>
                        <th> Language : </th> <td> ${live_stream.lang} </td>
                        <th> Url : </th> <td> <a href="${live_stream.url}" target="_blank" alt="${live_stream.name}" title="${live_stream.name}"> ${live_stream.url}</td>
                    </tr>
                 </table>
              </div>
            </div>
          </div>
          `;
            $("#radio-list-accordionFlush").append(html)
        });
        // #radio-list-accordionFlush

    }
});
const addRadio = (event) => ipcRenderer.send(IpcCommand.RADIO.ADD, true)
const deleteRadio = (event) => {
    const formData = $("#radio-list-form").serializeArray()
    ipcRenderer.send(IpcCommand.RADIO.DELETE,{data : formData})


}
