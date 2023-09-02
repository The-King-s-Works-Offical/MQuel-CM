const $ = require('jquery');
const path = require('path');
const htmlRender = (file, elementId) => {
    //console.log('Component htmlRender called', file, elementId);
    const dom = elementId;
    const filePath = path.join(__dirname, `../../public/Components/${file}`)
    //console.log(filePath);
    $.ajax({
        url: filePath,
        success: (data) => {
            $("#" + dom).html(data);
        },
        error: (error) => {

            console.log(`${file} Not found: \n` + error.responseText);
        }
    })
}
const appendRender = (file, elementId) => {
    //console.log('Component appendRender called', file, elementId);
    const dom = elementId;
    const filePath = path.join(__dirname, `../../public/Components/${file}`)
    //console.log(filePath);
    $.ajax({
        url: filePath,
        success: (data) => {
            $("#" + dom).append(data);
        },
        error: (error) => {

            console.log(`${file} Not found: \n` + error.responseText);
        }
    })
};


module.exports = {
    htmlRender,
    appendRender
};