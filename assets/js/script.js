// Get the date working with moment .js
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    });

