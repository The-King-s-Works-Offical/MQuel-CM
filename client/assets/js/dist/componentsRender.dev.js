"use strict";

var $ = require('jquery');

var path = require('path');

var htmlRender = function htmlRender(file, elementId) {
  //console.log('Component htmlRender called', file, elementId);
  var dom = elementId;
  var filePath = path.join(__dirname, "../../public/Components/".concat(file)); //console.log(filePath);

  $.ajax({
    url: filePath,
    success: function success(data) {
      $("#" + dom).html(data);
    },
    error: function error(_error) {
      console.log("".concat(file, " Not found: \n") + _error.responseText);
    }
  });
};

var appendRender = function appendRender(file, elementId) {
  //console.log('Component appendRender called', file, elementId);
  var dom = elementId;
  var filePath = path.join(__dirname, "../../public/Components/".concat(file)); //console.log(filePath);

  $.ajax({
    url: filePath,
    success: function success(data) {
      $("#" + dom).append(data);
    },
    error: function error(_error2) {
      console.log("".concat(file, " Not found: \n") + _error2.responseText);
    }
  });
};

module.exports = {
  htmlRender: htmlRender,
  appendRender: appendRender
};