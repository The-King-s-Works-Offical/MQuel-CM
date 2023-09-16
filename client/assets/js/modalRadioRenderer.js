"use strict";
const electron = require("electron");
const {
    ipcRenderer, Notification,
} = electron;
const path = require("path");
const IpcCommand = require("../../common/ipcCommand");
const $ = require("jquery");
const url = require("url");
const {response} = require("express");


console.log(IpcCommand)
const RADIO_COMMAND = IpcCommand.RADIO;

ipcRenderer.send(IpcCommand.GET_LANG);
ipcRenderer.on(IpcCommand.GET_LANG, (event, response) => {
    const pageName = window.location.href.split('/').pop().split('.')[0];
    const locale = response[pageName]
    for (const key in locale) {
        if (key === "title") {
            document.title = locale.title;
            $("#page-title").text(locale.title)
        } else if (key === "description") {
            $("meta[name='description']").attr("content", locale.description);
        } else {
            $(`#${key}`).html(locale[key]);
            //document.getElementById(key).innerText = locale[key];
        }
    }
});
const minimizeModal = () => ipcRenderer.send(RADIO_COMMAND.MODAL.MINIMIZE, true)
const closeModal = () => ipcRenderer.send(RADIO_COMMAND.MODAL.CLOSE, true)

const formSubmit = (event) => {

    const question = "Should the entered information be added to the radio system ?"
    ipcRenderer.send(RADIO_COMMAND.MODAL.FORM.QUESTION, question);
    ipcRenderer.on(RADIO_COMMAND.MODAL.FORM.QUESTION, (event, response) => {
        console.log(response)
        if (response.status === 200) {
            console.log("Status : ", 200)
            const formData = $("#radio-add-form").serializeArray()
            ipcRenderer.send(RADIO_COMMAND.MODAL.FORM.INSERT, {
                ...response, data: formData
            })
            setTimeout(() => {
                ipcRenderer.send(RADIO_COMMAND.MODAL.CLOSE, true)
            }, 2500)
        }
    })
    event.preventDefault();
}
const formReset = () => {
    console.log(Notification.isSupported())
    alert("Please enter form reset")


    alert("Radio add form reset !")
}
console.log("Radio Add Panel Ready")