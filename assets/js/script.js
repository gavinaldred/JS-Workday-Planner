$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  });
  
  $(".saveBtn").on("click", function () {
    // Get nearby values
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    // Set items in local storage
    localStorage.setItem(time, text);
  });
  
  let hourEight = $("#hour8 .description");
  let hourNine = $("#hour9 .description");
  let hourTen = $("#hour10 .description");
  let hourEleven = $("#hour11 .description");
  let hourTwelve = $("#hour12 .description");
  let hourThirteen = $("#hour13 .description");
  let hourFourteen = $("#hour14 .description");
  let hourFifteen = $("#hour15 .description");
  let hourSixteen = $("#hour16 .description");
  let hourSeventeen = $("#hour17 .description");
  
  hourEight.val(localStorage.getItem("hour8"));
  hourNine.val(localStorage.getItem("hour9"));
  hourTen.val(localStorage.getItem("hour10"));
  hourEleven.val(localStorage.getItem("hour11"));
  hourTwelve.val(localStorage.getItem("hour12"));
  hourThirteen.val(localStorage.getItem("hour13"));
  hourFourteen.val(localStorage.getItem("hour14"));
  hourFifteen.val(localStorage.getItem("hour15"));
  hourSixteen.val(localStorage.getItem("hour16"));
  hourSeventeen.val(localStorage.getItem("hour17"));
  
  for (var i = 8; i <= 17; i++) {
    var timeBlock = `<div id="hour${i}" class="row time-block">
                          <div class="col-md-1 hour">
                              ${i}:00am
                          </div>
                          <textarea class="col-md-10 description"></textarea>
                          <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>
                   
                      </div>`;
    $(".container").append(timeBlock);
  }