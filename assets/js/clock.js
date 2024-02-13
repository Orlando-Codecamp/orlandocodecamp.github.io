// Author: Blair Anderson - Copyright: Tachyons Templates LLC
// Source: github.com/blairanderson/countdown-tachyons-jekyll/blob/master/js/clock.js
// Changes:
// 1. Fixed typo ("Search") in comment
// 2. Changed getTimeRemaining to return all zeroes for past deadlines
// 3. Set UTC date/time for Orlando Code Camp 2024
// 4. Pass start and end ticks into getTimeRemaining
// 5. Better variable names (t => time, total => ticks, etc.)
// 6. Add integer checks to initializeClock and getTimeRemaining
// 7. Added temporary interim fields for debugging

function getTimeRemaining(startTick, endTick) {
  if (!Number.isInteger(startTick)
      || !Number.isInteger(endTick)
      || startTick >= endTick)
  	return {
    	ticks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

  var ticks = endTick - startTick;
  var days = Math.floor(ticks / (1000 * 60 * 60 * 24));
  var hours = Math.floor(ticks / (1000 * 60 * 60) % 24);
  var minutes = Math.floor(ticks / 1000 / 60 % 60);
  var seconds = Math.floor(ticks / 1000 % 60);

  return {
    ticks: ticks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endTick) {
  if (!Number.isInteger(endTick))
    return;

  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('#days');
  var hoursSpan = clock.querySelector('#hours');
  var minutesSpan = clock.querySelector('#minutes');
  var secondsSpan = clock.querySelector('#seconds');
  var startTimeSpan = clock.querySelector('#start');
  var endTimeSpan = clock.querySelector('#end');
  var ticksSpan = clock.querySelector('#ticks');

  endTimeSpan.innerHTML = new Date(endTick).toLocaleString('en-US');

  function updateClock() {
    var startTick = new Date().getTime();
    var time = getTimeRemaining(startTick,endTick);

    daysSpan.innerHTML = time.days;
    hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);
    startTimeSpan.innerHTML = new Date(startTick).toLocaleString('en-US');
    ticksSpan.innerHTML = time.ticks;

    if (time.ticks <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateClock();
  var timeInterval = setInterval(updateClock, 1000);
}

// UTC equivalent of "Sat Feb 24 2024 07:30:00 GMT-0500 (Eastern Standard Time)"
// People in different timezones will see different dates unless you use UTC
var endTick = new Date(Date.UTC(2024, 1, 24, 12, 30, 0, 0)).getTime();

initializeClock('clock-div', endTick);
