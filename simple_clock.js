
var THEMES = [
  { // tangerine
    spot_color: 'rgb(255,224,160)',
    edge_color: 'rgb(255,192,64)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false
  },
  { // ocean
    spot_color: 'rgb(160,224,255)',
    edge_color: 'rgb(64,192,255)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false
  },
  { // ash
    spot_color: 'rgb(192,192,192)',
    edge_color: 'rgb(128,128,128)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false
  },
  { // olive
    spot_color: 'rgb(192,224,0)',
    edge_color: 'rgb(128,192,0)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false
  },
  { // lavender
    spot_color: 'rgb(224,192,224)',
    edge_color: 'rgb(192,128,192)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false
  },
  { // sakura
    spot_color: 'rgb(255,192,224)',
    edge_color: 'rgb(255,128,192)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false
  },
  { // midnight
    spot_color: 'rgb(96,96,96)',
    edge_color: 'rgb(64,64,64)',
    edge_shadow_color: 'rgb(24,24,24)',
    secondhand_color: 'rgb(80,80,80)',
    minutehand_color: 'rgb(96,96,96)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: true
  },
];

var WHITE = 'rgb(255,255,255)';
var BLACK = 'rgb(0,0,0)';

var showSecondBar = 0;
var showDigitalClock = 0;
var theme = 0;

onload = function() {
  heartbeat();
}

onkeypress = function(e) {
  switch (e.key) {
    case 'c':
      switchColor();
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
  var canvas = document.getElementById('main_clock');
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  var weight = Math.min(width, height);

  var x = (event.offsetX - canvas.clientWidth / 2) / weight;
  var y = (event.offsetY - canvas.clientHeight / 2) / weight;
  var radius = Math.sqrt(x * x + y * y);
  if (radius <= 0.48) {
    showSecondBar = !showSecondBar;
  } else {
    switchColor();
  }

  drawClock();
}

function switchColor() {
  theme = (theme + 1) % (THEMES.length);

  if (THEMES[theme].is_dark) {
    document.bgColor = 'black';
  } else {
    document.bgColor = 'white';
  }
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
  var dateString = "" + month + "/" + day;
  var datetimeString = "" + year + "/" + month + "/" + day + " " + hour + ":" + (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second;
  var rad, i;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  if (THEMES[theme].is_dark) {
    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = THEMES[theme].edge_shadow_color;
  ctx.arc(xPadding + weight / 2, yPadding + weight / 2 + tit, weight * 0.96 / 2,
    0, Math.PI * 2, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  if (THEMES[theme].is_dark) {
    ctx.strokeStyle = THEMES[theme].edge_color;
    ctx.arc(xPadding + weight / 2, yPadding + weight / 2, weight * 0.96 / 2, 0,
      Math.PI * 2, false);
    ctx.stroke();
  } else {
    ctx.strokeStyle = THEMES[theme].edge_color;
    ctx.arc(xPadding + weight / 2, yPadding + weight / 2, weight * 0.96 / 2, 0,
      Math.PI * 2, false);
    ctx.stroke();
  }

  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.fillStyle = THEMES[theme].spot_color;
    rad = Math.PI * 2 * (i / 12);
    ctx.arc(xPadding + (1 + Math.sin(rad) * 0.9) * weight / 2,
      yPadding + (1 - Math.cos(rad) * 0.9) * weight / 2,
      tit, 0, Math.PI * 2, false);
    ctx.fill();
  }

  if (showDigitalClock > 0) {
    var x = width / 2
    var y = (height + weight) / 2 + 72
    if (width + 200 > height) {
      if ((hour >= 0 && hour < 3) || (hour >= 9 && hour < 15) || (hour >= 21 && hour < 24)) {
        y = (height + weight) * 3 / 8 + yPadding / 2 + tit * 6;
      } else {
        y = (height + weight) * 1 / 8 + yPadding / 2 + tit * 6;
      }
    }
    ctx.fillStyle = THEMES[theme].edge_color;
    ctx.font = "" + tit * 6 + "px sans-serif";
    ctx.textAlign = "center";
    if (showDigitalClock == 1) {
      ctx.fillText(dateString, x, y);
    } else if (showDigitalClock == 2) {
      ctx.fillText(datetimeString, x, y);
    }
  }
  
  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = THEMES[theme].edge_shadow_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2 + tit);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = THEMES[theme].edge_shadow_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2 + tit);
  ctx.stroke();

  if (showSecondBar) {
    ctx.beginPath();
    ctx.lineWidth = tit;
    ctx.strokeStyle = THEMES[theme].edge_shadow_color;
    ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit);
    rad = Math.PI * 2 * (second / 60);
    ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.82) * weight / 2, yPadding + (1 -
      Math.cos(rad) * 0.82) * weight / 2 + tit);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = THEMES[theme].edge_shadow_color;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2 + tit,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = THEMES[theme].minutehand_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = THEMES[theme].minutehand_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2);
  ctx.stroke();

  if (showSecondBar) {
    ctx.beginPath();
    ctx.lineWidth = tit;
    if (hour < 12) {
      ctx.strokeStyle = THEMES[theme].edge_color;
    } else {
      ctx.strokeStyle = THEMES[theme].secondhand_color;
    }
    ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
    rad = Math.PI * 2 * (second / 60);
    ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.82) * weight / 2, yPadding + (1 -
      Math.cos(rad) * 0.82) * weight / 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = THEMES[theme].centerspot_color;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();
}
