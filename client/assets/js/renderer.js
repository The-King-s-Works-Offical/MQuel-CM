const { ipcRenderer } = require("electron");
const { IpcCommand } = require("../scripts/ipcCommand");
const $ = require("jquery");
const render = require('../assets/js/componentsRender');


// Main Components Render
render.htmlRender("windowToolbar.html", "windowToolbar"); // Toolbar Rendering
render.htmlRender("windowSidebar.html", "windowSidebar"); // Sidebar Rendering
render.htmlRender("windowTitlebar.html", "windowTitleBar"); // Titlebar Rendering
