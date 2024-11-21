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

  function updateClock() {
    var startTick = new Date().getTime();
    var time = getTimeRemaining(startTick,endTick);

    daysSpan.innerHTML = time.days;
    hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

    if (time.ticks <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateClock();
  var timeInterval = setInterval(updateClock, 1000);
}

// UTC equivalent of "Sat Apr 05 2025 07:30:00 GMT-0500 (Eastern Standard Time)"
var endTick = new Date(Date.UTC(2025, 3, 5, 12, 30, 0, 0)).getTime();

initializeClock('clock-div', endTick);
