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

  
  // Create a function to track the hour
  function hourTracker() {
    // Get the current number of hours
    var currentHour = moment().hour();
  
    $(".saveBtn").on("click", function () {
      var text = $(this).siblings("textarea").val();
      var hour = $(this).parent().attr("id");
      localStorage.setItem(hour, text);
    });

    $(".time-block").each(function () {
        var hour = $(this).attr("id");
        var text = localStorage.getItem(hour);
        $(this).find("textarea").val(text);
      });
      
  
    $(".clearBtn").on("click", clearPage);
    $(".refreshBtn").on("click", refreshPage);
  
    function clearPage() {
      localStorage.clear();
      $(".past")
        .find("textarea")
        .removeAttr("disabled")
        .val("")
        .attr("placeholder", "");
    }
  
    function refreshPage() {
        location.reload();
    }
    
    // Loop over time blocks
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").replace("hour", ""));
  
      // Check if we've moved past this time
      if (blockHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("future");
        $(this).removeClass("present");
        var text = $(this).find("textarea").val();
        if (!text) {
          $(this).find("textarea").attr("disabled", "disabled");
          $(this)
            .find("textarea")
            .attr("placeholder", "Time has passed. This block is non-editable.");
        }
      } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      } else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
      }
    });
  }
  hourTracker(); // Re-run the function
  