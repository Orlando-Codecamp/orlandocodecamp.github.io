// Author: Blair Anderson - Copyright: Tachyons Templates LLC
// Source: github.com/blairanderson/countdown-tachyons-jekyll/blob/master/js/clock.js
// Changes:
// 1. Fixed typo ("Search") in comment
// 2. Changed getTimeRemaining to return all zeroes for past deadlines
// 3. Set UTC date/time for Orlando Code Camp 2024

function getTimeRemaining(endtime) {
	var endDate = Date.parse(endtime);
  var now = Date.parse(new Date());

  if (now >= endDate)
  	return {
    	total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

  var t = endDate - now;
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / (1000 * 60 * 60) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// example 15 days out
// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
// people in different timezones will see different dates unless you use UTC
// Search your timezone in UTC
// then use this format:
// var deadline = new Date(Date.parse('19 August 2017 19:15:00Z'));

// if (new Date() > deadline) {
//   alert('COUNTDOWN COMPLETE! \n Some Call to Action!!!');
// }

// UTC equivalent of "Sat Feb 24 2024 07:30:00 GMT-0500 (Eastern Standard Time)"
var deadline = new Date(Date.parse('24 February 2024 12:30:00Z'));

initializeClock('clockdiv', deadline);
