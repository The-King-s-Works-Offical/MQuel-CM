"use strict";

var _require = require("electron"),
    ipcRenderer = _require.ipcRenderer;

var _require2 = require("../scripts/ipcCommand"),
    IpcCommand = _require2.IpcCommand;

var $ = require("jquery");

var render = require('../assets/js/componentsRender'); // Main Components Render


render.htmlRender("windowToolbar.html", "windowToolbar"); // Toolbar Rendering

render.htmlRender("windowSidebar.html", "windowSidebar"); // Sidebar Rendering

render.htmlRender("windowTitlebar.html", "windowTitleBar"); // Titlebar Rendering