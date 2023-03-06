var clockInBtn = document.getElementById("clock-in-btn");
var clockOutBtn = document.getElementById("clock-out-btn");

var fullNameInput = document.getElementById("full-name");
var timerDisplay = document.getElementById("timer");

var startTime;
var endTime;
var timerInterval;

clockInBtn.addEventListener("click", function() {
  if (fullNameInput.checkValidity()) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000); // Start the timer
    timerDisplay.textContent = "00:00:00";
    alert("You have clocked in at " + new Date(startTime).toLocaleTimeString());
  } else {
    fullNameInput.reportValidity();
  }
});

clockOutBtn.addEventListener("click", function() {
  if (fullNameInput.checkValidity()) {
    endTime = new Date().getTime();
    clearInterval(timerInterval); // Stop the timer
    var elapsed = endTime - startTime;
    var elapsedSeconds = elapsed / 1000;
    alert("You have clocked out at " + new Date(endTime).toLocaleTimeString() + " and worked for " + elapsedSeconds.toFixed(2) + " seconds.");
  } else {
    fullNameInput.reportValidity();
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://script.google.com/macros/s/AKfycbzKpqI4rDVTtV4GLWSczL9DvFYf6kwINgHXdlwiUT_vLWHi2VPo5I6_iWQngzqcTBzf/exec?gid=0");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};
  
  let data = `{
    "Clock In": 12
  }`;
  
  xhr.send(data);
});

function updateTimer() {
  var now = new Date().getTime();
  var elapsed = now - startTime;
  var hours = Math.floor(elapsed / (1000 * 60 * 60));
  var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
  timerDisplay.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}


