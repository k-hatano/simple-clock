
var Color = function() {
  this.red = 0;
  this.green = 0;
  this.blue = 0;

  return this;
}

Color.prototype.setRGB = function(red, green, blue) {
  this.red = red;
  this.green = green;
  this.blue = blue;

  return this;
}

Color.prototype.setFromHSV = function(hue, saturation, lightness) {
  var C = lightness * saturation;
  var H = (hue % 360) / 60;
  var X = C * (1 - Math.abs(H % 2 - 1));

  var red, green, blue;
  if (0 <= H && H < 1) {
    red = C;
    green = X;
    blue = 0;
  } 
  if (1 <= H && H < 2) {
    red = X;
    green = C;
    blue = 0;
  } 
  if (2 <= H && H < 3) {
    red = 0;
    green = C;
    blue = X;
  } 
  if (3 <= H && H < 4) {
    red = 0;
    green = X;
    blue = C;
  } 
  if (4 <= H && H < 5) {
    red = X;
    green = 0;
    blue = C;
  } 
  if (5 <= H && H < 6) {
    red = C;
    green = 0;
    blue = X;
  } 

  var m = lightness - C;
  red = red + m;
  green = green + m;
  blue = blue + m;

  this.red = Math.floor(red * 255);
  this.green = Math.floor(green * 255);
  this.blue = Math.floor(blue * 255);

  return this;
}

Color.prototype.toRGBString = function() {
  return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
}


var THEMES = [
  { // rainbow 1
    name: 'rainbow 1',
    spot_color: 'rgb(192,192,192)',
    edge_color: 'rgb(128,128,128)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    rainbow_shift: 0,
    is_dark: false,
    is_rainbow: true
  },
  { // rainbow 2
    name: 'rainbow 2',
    spot_color: 'rgb(192,192,192)',
    edge_color: 'rgb(128,128,128)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    rainbow_shift: 180,
    is_dark: false,
    is_rainbow: true
  },
  { // tangerine
    name: 'tangerine',
    spot_color: 'rgb(255,224,160)',
    edge_color: 'rgb(255,192,64)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false,
    is_rainbow: false
  },
  { // ocean
    name: 'ocean',
    spot_color: 'rgb(160,224,255)',
    edge_color: 'rgb(64,192,255)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false,
    is_rainbow: false
  },
  { // ash
    name: 'ash',
    spot_color: 'rgb(192,192,192)',
    edge_color: 'rgb(128,128,128)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false,
    is_rainbow: false
  },
  { // olive
    name: 'olive',
    spot_color: 'rgb(192,224,0)',
    edge_color: 'rgb(128,192,0)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false,
    is_rainbow: false
  },
  { // amethyst
    name: 'amethyst',
    spot_color: 'rgb(224,192,224)',
    edge_color: 'rgb(192,128,192)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false,
    is_rainbow: false
  },
  { // sakura
    name: 'sakura',
    spot_color: 'rgb(255,192,224)',
    edge_color: 'rgb(255,128,192)',
    edge_shadow_color: 'rgb(192,192,192)',
    secondhand_color: 'rgb(128,128,128)',
    minutehand_color: 'rgb(64,64,64)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: false,
    is_rainbow: false
  },
  { // midnight
    name: 'midnight',
    spot_color: 'rgb(96,96,96)',
    edge_color: 'rgb(64,64,64)',
    edge_shadow_color: 'rgb(24,24,24)',
    secondhand_color: 'rgb(80,80,80)',
    minutehand_color: 'rgb(96,96,96)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: true,
    is_rainbow: false
  },
  { // neon
    name: 'neon',
    spot_color: 'rgb(0,128,128)',
    edge_color: 'rgb(0,96,96)',
    edge_shadow_color: 'rgb(0,48,48)',
    secondhand_color: 'rgb(0,96,96)',
    minutehand_color: 'rgb(0,128,128)',
    centerspot_color: 'rgb(32,32,32)',
    is_dark: true,
    is_rainbow: false
  },
];

var WHITE = 'rgb(255,255,255)';
var BLACK = 'rgb(0,0,0)';

var showSecondBar = 0;
var showDigitalClock = 0;
var selectedTheme = 0;
var baseWidth = 1.0;

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
    case 'b':
      baseWidth += 0.1;
      if (baseWidth >= 2) baseWidth = 2;
      drawClock();
      break;
    case 't':
      baseWidth -= 0.1;
      if (baseWidth <= 0.1) baseWidth = 0.1;
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
  selectedTheme = (selectedTheme + 1) % (THEMES.length);

  if (THEMES[selectedTheme].is_dark) {
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
  var tit = weight / 128 * baseWidth;

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

  var theme = THEMES[selectedTheme];

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  if (theme.is_dark) {
    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = theme.edge_shadow_color;
  ctx.arc(xPadding + weight / 2, yPadding + weight / 2 + tit, weight * 0.96 / 2,
    0, Math.PI * 2, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  if (theme.is_dark) {
    ctx.strokeStyle = theme.edge_color;
    ctx.arc(xPadding + weight / 2, yPadding + weight / 2, weight * 0.96 / 2, 0,
      Math.PI * 2, false);
    ctx.stroke();
  } else {
    ctx.strokeStyle = theme.edge_color;
    if (theme.is_rainbow) {
      var color = new Color();
      color.setFromHSV((hour * 60 + minute) / 24 / 60 * 360 + theme.rainbow_shift, 0.67, 0.67);
      ctx.strokeStyle = color.toRGBString();
    }
    ctx.arc(xPadding + weight / 2, yPadding + weight / 2, weight * 0.96 / 2, 0,
      Math.PI * 2, false);
    ctx.stroke();
  }

  for (i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.fillStyle = theme.spot_color;
    if (theme.is_rainbow) {
      var color = new Color();
      color.setFromHSV((hour * 60 + minute) / 24 / 60 * 360 + theme.rainbow_shift, 0.4, 1);
      ctx.fillStyle = color.toRGBString();
    }
    rad = Math.PI * 2 * (i / 12);
    ctx.arc(xPadding + (1 + Math.sin(rad) * (0.95 - baseWidth / 20)) * weight / 2,
      yPadding + (1 - Math.cos(rad) * (0.95 - baseWidth / 20)) * weight / 2,
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
    ctx.fillStyle = theme.edge_color;
    if (theme.is_rainbow) {
      var color = new Color();
      color.setFromHSV((hour * 60 + minute) / 24 / 60 * 360 + theme.rainbow_shift, 0.67, 0.67);
      ctx.fillStyle = color.toRGBString();
    }
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
  ctx.strokeStyle = theme.edge_shadow_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2 + tit);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = theme.edge_shadow_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2 + tit);
  ctx.stroke();

  if (showSecondBar) {
    ctx.beginPath();
    ctx.lineWidth = tit;
    ctx.strokeStyle = theme.edge_shadow_color;
    ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2 + tit);
    rad = Math.PI * 2 * (second / 60);
    ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.82) * weight / 2, yPadding + (1 -
      Math.cos(rad) * 0.82) * weight / 2 + tit);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = theme.edge_shadow_color;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2 + tit,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = tit * 2;
  ctx.strokeStyle = theme.minutehand_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
  rad = Math.PI * 2 * (hour / 12 + minute / 60 / 12);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.6) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.6) * weight / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = tit * 1.5;
  ctx.strokeStyle = theme.minutehand_color;
  ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
  rad = Math.PI * 2 * (minute / 60 + second / 60 / 60);
  ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.8) * weight / 2, yPadding + (1 -
    Math.cos(rad) * 0.8) * weight / 2);
  ctx.stroke();

  if (showSecondBar) {
    ctx.beginPath();
    ctx.lineWidth = tit;
    if (hour < 12) {
      ctx.strokeStyle = theme.edge_color;
      if (theme.is_rainbow) {
        var color = new Color();
        color.setFromHSV((hour * 60 + minute) / 24 / 60 * 360 + theme.rainbow_shift, 0.67, 0.9);
        ctx.strokeStyle = color.toRGBString();
      }
    } else {
      ctx.strokeStyle = theme.secondhand_color;
      if (theme.is_rainbow) {
        var color = new Color();
        color.setFromHSV((hour * 60 + minute) / 24 / 60 * 360 + theme.rainbow_shift, 0.67, 0.5);
        ctx.strokeStyle = color.toRGBString();
      }
    }
    ctx.moveTo(xPadding + weight / 2, yPadding + weight / 2);
    rad = Math.PI * 2 * (second / 60);
    ctx.lineTo(xPadding + (1 + Math.sin(rad) * 0.82) * weight / 2, yPadding + (1 -
      Math.cos(rad) * 0.82) * weight / 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = theme.centerspot_color;
  rad = Math.PI * 2 * (i / 12);
  ctx.arc(xPadding + weight / 2,
    yPadding + weight / 2,
    tit * 2, 0, Math.PI * 2, false);
  ctx.fill();
}
