var LIGHTTANGERINE = 'rgb(255,224,160)';
var TANGERINE = 'rgb(255,192,64)';
var LIGHTOCEAN = 'rgb(160,224,255)';
var OCEAN = 'rgb(64,192,255)';
var LIGHTASH = 'rgb(192,192,192)';
var ASH = 'rgb(128,128,128)';
var LIGHTOLIVE = 'rgb(192,224,0)';
var OLIVE = 'rgb(128,192,0)';
var LIGHTVIOLET = 'rgb(224,192,224)';
var VIOLET = 'rgb(192,128,192)';
var LIGHTCHERRY = 'rgb(255,192,224)';
var CHERRY = 'rgb(255,128,192)';

var THEMECOLOR = [TANGERINE, OCEAN, ASH, OLIVE, VIOLET, CHERRY];
var THEMECOLOR_LIGHT = [LIGHTTANGERINE, LIGHTOCEAN, LIGHTASH, LIGHTOLIVE, LIGHTVIOLET, LIGHTCHERRY];

var LIGHTGRAY = 'rgb(192,192,192)';
var DARKGRAY = 'rgb(64,64,64)';
var DEEPDARKGRAY = 'rgb(32,32,32)';
var RED = 'rgb(255,0,0)';
var BLUE = 'rgb(0,0,255)';

var showSecondBar = 0;
var showDigitalClock = 0;
var theme = 0;

onload = function() {
  heartbeat();
}

onkeypress = function(e) {
  switch (e.key) {
    case 'c':
      theme = (theme + 1) % (THEMECOLOR.length);
      drawClock();
      break;
    case 's':
      showSecondBar = !showSecondBar;
      drawClock();
      break;
    case 'd':
      showDigitalClock = (showDigitalClock + 1) % 3;
      drawClock();
      break;
    default:
      break;  
  }
}

function heartbeat() {
  var canvas = document.getElementById('main_clock');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  drawClock();
  setTimeout(heartbeat, 1000);
};

onresize = function() {
  var canvas = document.getElementById('main_clock');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  drawClock();
};

function clockClicked() {
  showSecondBar = !showSecondBar;
  showDigitalClock = showSecondBar;
  drawClock();
}

function drawClock() {
  var canvas = document.getElementById('main_clock');
  var width = canvas.width;
  var height = canvas.height;

  var weight = Math.min(width, height);
  var xPadding = (width - weight) / 2;
  var yPadding = (height - weight) / 2;
  var tit = weight / 128;

  var now = new Date();
  var year = now.getYear() + 1900;
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var dateString = "" + year + "/" + month + "/" + day;
  var datetimeString = "" + year + "/" + month + "/" + day + " " + hour + ":" + (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second;
  var rad, i;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.fillStyle = THEMECOLOR_LIGHT[theme];
    rad = Math.PI * 2 * (i / 12);
    ctx.arc(xPadding + (1 + Math.sin(rad) * 0.9) * weight / 2,
      yPadding + (1 - Math.cos(rad) * 0.9) * weight / 2,
      tit, 0, Math.PI * 2, false);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = LIGHTGRAY;
  ctx.arc(xPadding + weight / 2, yPadding + weight / 2 + tit, weight * 0.96 / 2,
    0, Math.PI * 2, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = THEMECOLOR[theme];;
  ctx.arc(xPadding + weight / 2, yPadding + weight / 2, weight * 0.96 / 2, 0,
    Math.PI * 2, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = LIGHTGRAY;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit / 2);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2 + tit);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = LIGHTGRAY;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit / 2);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2 + tit);
  ctx.stroke();

  if (showSecondBar) {
    ctx.beginPath();
    ctx.lineWidth = tit;
    ctx.strokeStyle = LIGHTGRAY;
    ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit / 2);
    rad = Math.PI * 2 * (second / 60);
    ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.82) * weight / 2, yPadding + (1 -
      Math.cos(rad) * 0.82) * weight / 2 + tit);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = LIGHTGRAY;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2 + tit,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = DARKGRAY;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = DARKGRAY;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2);
  ctx.stroke();

  if (showSecondBar) {
    ctx.beginPath();
    ctx.lineWidth = tit;
    if (hour < 12) {
      ctx.strokeStyle = RED;
    } else {
      ctx.strokeStyle = BLUE;
    }
    ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
    rad = Math.PI * 2 * (second / 60);
    ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.82) * weight / 2, yPadding + (1 -
      Math.cos(rad) * 0.82) * weight / 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = DEEPDARKGRAY;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();

  if (width + 180 < height && showDigitalClock > 0) {
    ctx.fillStyle = DEEPDARKGRAY;
    ctx.font = "" + tit * 6 + "px sans-serif";
    ctx.textAlign = "center";
    if (showDigitalClock == 1) {
      ctx.fillText(dateString, width / 2, (height + weight) / 2 + 72);
    } else if (showDigitalClock == 2) {
      ctx.fillText(datetimeString, width / 2, (height + weight) / 2 + 72);
    }
  }
}
