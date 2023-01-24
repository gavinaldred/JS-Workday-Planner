$(document).ready(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}); // adds time and date to top of site using moment

$(".saveBtn").on("click", function () {
  // Get nearby values
  let text = $(this).siblings(".description").val();
  let time = $(this).parent().attr("id");
  // Set items in local storage
  localStorage.setItem(time, text);
});

// variables for planner time slots
const eightAM = $("#hour8 .description");
const nineAM = $("#hour9 .description");
const tenAM = $("#hour10 .description");
const elevenAM = $("#hour11 .description");
const twelvePM = $("#hour12 .description");
const thirteenPM = $("#hour13 .description");
const fourteenPM = $("#hour14 .description");
const fifteenPM = $("#hour15 .description");
const sixteenPM = $("#hour16 .description");
const seventeenPM = $("#hour17 .description");

//gets the value of time slots from local storage if page reloadeded and there are vlaues
eightAM.val(localStorage.getItem("hour8"));
nineAM.val(localStorage.getItem("hour9"));
tenAM.val(localStorage.getItem("hour10"));
elevenAM.val(localStorage.getItem("hour11"));
twelvePM.val(localStorage.getItem("hour12"));
thirteenPM.val(localStorage.getItem("hour13"));
fourteenPM.val(localStorage.getItem("hour14"));
fifteenPM.val(localStorage.getItem("hour15"));
sixteenPM.val(localStorage.getItem("hour16"));
seventeenPM.val(localStorage.getItem("hour17"));

// adds the time slots to the html
for (let i = 8; i <= 17; i++) {
  let am_pm = "am";
  if (i > 11) {
    // adds logic to add correct AM or PM to time of day block
    am_pm = "pm";
  }
  let timeBlock = `<div id="hour${i}" class="row time-block">
                              <div class="col-md-1 hour">
                                  ${i}:00 ${am_pm}
                              </div>
                              <textarea class="col-md-10 description"></textarea>
                              <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>
                        </div>`;
  $(".container").append(timeBlock);
}

// Create a function to track the hour
function timeTracker() {
  // Get the current number of hours
  let currentHour = moment().hour();
  // saves to local storage
  $(".saveBtn").on("click", function () {
    let text = $(this).siblings("textarea").val();
    let hour = $(this).parent().attr("id");
    localStorage.setItem(hour, text);
  });
  // saves time to local storage by block id
  $(".time-block").each(function () {
    let hour = $(this).attr("id");
    let text = localStorage.getItem(hour);
    $(this).find("textarea").val(text);
  });

  // targets clear and refresh page buttons and runs functions on click
  $(".clearBtn").on("click", clearPage);
  $(".refreshBtn").on("click", refreshPage);

  // clear page function // clears local storage and makes all blocks editable
  function clearPage() {
    localStorage.clear();
    $(".past")
      .find("textarea")
      .removeAttr("disabled")
      .val("")
      .attr("placeholder", "");
  }

  //reload the page // attached to a refresh page button
  function refreshPage() {
    location.reload();
  }

  // Loop over time blocks
  $(".time-block").each(function () {
    let blockHour = parseInt($(this).attr("id").replace("hour", ""));

    // Check if we've moved past current time
    // Check if the time block is in the past
    if (blockHour < currentHour) {
      $(this).addClass("past");
      $(this).removeClass("future");
      $(this).removeClass("present");
      // Disable the textarea if it's empty
      let text = $(this).find("textarea").val();
      if (!text) {
        $(this).find("textarea").attr("disabled", true);
        $(this)
          .find("textarea")
          .attr("placeholder", "Time has passed. Non-editable.");
      }
    }
    // Check if the time block is the current hour
    else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
      $(this).removeClass("future");
    }
    // Check if the time block is in the future
    else {
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");
    }
  });
}
// function to save all rather than clicking each annoying save button
$(".saveAllBtn").on("click", function () {
  $(".time-block").each(function () {
    let text = $(this).find("textarea").val();
    let time = $(this).attr("id");
    localStorage.setItem(time, text);
  });
});

timeTracker(); // run the  function
