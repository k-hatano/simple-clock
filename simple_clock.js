var LIGHTORANGE = 'rgb(255,224,192)';
var LIGHTGRAY = 'rgb(192,192,192)';
var ORANGE = 'rgb(255,192,0)';
var DARKGRAY = 'rgb(64,64,64)';

onload = function() {
  heartbeat();
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

function drawClock() {
  var canvas = document.getElementById('main_clock');
  var width = canvas.width;
  var height = canvas.height;

  var weight = Math.min(width, height);
  var xPadding = (width - weight) / 2;
  var yPadding = (height - weight) / 2;
  var tit = weight / 128;

  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var rad, i;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.fillStyle = LIGHTORANGE;
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
  ctx.strokeStyle = ORANGE;
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
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit / 2);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = DARKGRAY;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit / 2);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = DARKGRAY;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();
}
