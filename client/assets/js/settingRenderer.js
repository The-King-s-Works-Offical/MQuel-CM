const { BrowserWindow, ipcRenderer, dialog, app, Notification } = require("electron");
const { command } = require("../scripts/ipcCommand");
const { htmlRender } = require('../assets/js/componentsRender');
const $ = require("jquery");

htmlRender("windowToolbar.html", "windowToolbar");
htmlRender("pages/settings/sidebar.html", "windowSidebar");


// Form Controls
const formSetup = document.getElementById("setupForm");
formSetup.addEventListener("reset", (event) => {
  event.preventDefault();
  const not = new Notification("Content Manager Setup Frames", {
    body: "The registration has been reset!\n",
  });
  not.show();
});

formSetup.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);

  const text = event.target[0].value; // Text

  const nameSurname = $("#staticName"); // Name Surname
  const email = $("#staticEmail"); // Email
  const password = $("#staticPassword"); // Password
  const auth = $("#staticAuthorization"); // Authentication
  const systemStartReady = $("#staticSystemReadyStarting"); // System Start Ready
  const gamesFilePath = $("#staticGamesFilePath"); // Games File Path
  const documentsFilePath = $("#staticGamesDocumentsFilePath"); // Documents File Path
  console.log(
    `
    ${text}
    Name Surname : ${nameSurname},
    Email : ${email}, 
      Password : ${password}, 
      authorization : ${auth}, 
      SystemStartReady : ${systemStartReady}, 
      Games File Path : ${gamesFilePath}, 
      Document File Path : ${documentsFilePath}`
  );
});


