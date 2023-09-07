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
            console.log(live_stream);
            html = `<div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapse${live_stream.index}" aria-expanded="false" aria-controls="flush-collapse${live_stream.index}">
                <i class="fa-solid fa-radio me-3"></i> ${live_stream.name}
              </button>
            </h2>
            <div id="flush-collapse${live_stream.index}" class="accordion-collapse collapse"
              data-bs-parent="#radio-list-accordionFlush">
              <div class="accordion-body">
                 <table class="table w-50">
                    <tr>
                        <th> Name : </th> <td> ${live_stream.name} </td>
                        <th> Type : </th> <td> ${live_stream.type} </td>
                    </tr>
                    <tr>
                        <th> Name : </th> <td> ${live_stream.name} </td>
                        
                    </tr>
                    <tr>
                        <th> Name : </th> <td> ${live_stream.name} </td>
                    </tr>
                     

                 </table>
              </div>
            </div>
          </div>`;
            $("#radio-list-accordionFlush").append(html)
        });
        // #radio-list-accordionFlush

    }
})