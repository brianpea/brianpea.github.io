var delay = 750;

//vh: fixes vh for mobile
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//star: star animation/interaction
let SpinStart;
let SpinPosition;
let WindowSize;

let Scale;
let ScaleLimit;

let Zoom = 0;
let ZoomSwitch;
let ZoomClick;

let ZoomMillis;
let ZoomDelay = 3000;

let textCenterX, textCenterY;

function setup() {
  frameRate(24);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("star");

  SpinPosition = float(getItem("Spin"));

  if (SpinStart === undefined) {
    SpinStart = random(-PI, PI);
  }

  if (isNaN(SpinPosition) === false) {
    SpinStart = SpinPosition;
  }

  if (windowWidth > windowHeight) {
    WindowSize = windowWidth * 1.75;
  } else {
    WindowSize = windowHeight * 1.75;
  }

  ZoomSwitch = getItem("ZoomSwitch");
  ZoomClick = getItem("ZoomClick");

  if (ZoomSwitch == false && ZoomClick == true) {
    Scale = getItem("Scale");
  } else {
    Scale = 1;
    ZoomSwitch = null;
    ZoomClick = null;
    removeItem("ZoomSwitch");
    removeItem("ZoomClick");
  }

  document.getElementById("links").style.opacity = 0;
}

function draw() {
  setTimeout(loaded, delay);

  let mobileMultiplier;
  if (windowWidth <= 750) {
    mobileMultiplier = 2;
  } else {
    mobileMultiplier = 1;
  }

  let Color = "yellow";
  let Radius1 = WindowSize;
  let Radius2 = windowWidth * (0.075 * mobileMultiplier);
  let Points = 9;
  let Tightness = map((windowWidth * 1.75), 0, (3500 / mobileMultiplier), 1, 0);
  let SecsPerSpin = Points * (600 / Points);

  Scale += Zoom;

  if (ZoomSwitch == true && ZoomClick == true) {
    ZoomClick = false;
    ZoomMillis = millis();
  } else if (ZoomSwitch == true) {
    Zoom += 0.01;

    if (millis() > ZoomMillis + ZoomDelay) {
      noLoop();
      Zoom = 0;
      storeItem("Scale", Scale);
      Scale = getItem("Scale");
      window.location.href = "/about";
    }
  }
  if (ZoomSwitch == false && ZoomClick == true) {
    ZoomClick = false;
    storeItem("ZoomClick", ZoomClick);
  } else if (ZoomSwitch == false) {
    Zoom -= 0.01;

    if (Scale <= 1) {
      Zoom = 0;
      Scale = 1;
      ZoomSwitch = null;
      ZoomClick = null;
      removeItem("ZoomSwitch");
      removeItem("ZoomClick");
    }
  }

  let textRef = document.getElementById("links");
  let welcomeRef = document.getElementById("welcome");

  let textRight = 25;
  let welcomeWidth = welcomeRef.offsetWidth;

  textCenterX = (windowWidth) - textRight - (welcomeWidth / 2);

  let textTop = textRef.offsetTop;
  let textHeight = textRef.offsetHeight;
  let welcomeHeight = welcomeRef.offsetHeight;
  let em = windowWidth * 0.015;
  let padding = 25;

  textCenterY = textTop - (textHeight / 2) + ((em * mobileMultiplier) + padding) + (em * mobileMultiplier) + (welcomeHeight / 2);

  clear();

  let Spin = round(SpinStart + (((millis() / 1000) * TWO_PI) / SecsPerSpin), 5);

  push();
  translate(textCenterX, textCenterY);
  scale(Scale, (Scale / 2));
  rotate(Spin);
  stroke(color(Color));
  strokeWeight(5);
  fill(color(Color));
  curveTightness(Tightness);

  star(0, 0, Radius1, Radius2, Points);
  pop();
  SpinPosition = storeItem("Spin", str(Spin));
}

function star(x, y, radius1, radius2, points) {
  let partRadius_scale = 1.7;
  let partAngle_difference = map(WindowSize, 750, 2500, 0.001, 0.14);

  let angle = TWO_PI / points;
  let partRadius = radius2 + ((radius1 - radius2) / 2) * partRadius_scale;

  beginShape();
  for (let a = 0; a <= TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    curveVertex(sx, sy);

    sx = x + cos(a + angle * (0.5 - partAngle_difference)) * partRadius;
    sy = y + sin(a + angle * (0.5 - partAngle_difference)) * partRadius;
    curveVertex(sx, sy);

    sx = x + cos(a + angle * 0.5) * radius1;
    sy = y + sin(a + angle * 0.5) * radius1;
    curveVertex(sx, sy);

    sx = x + cos(a + angle * (0.5 + partAngle_difference)) * partRadius;
    sy = y + sin(a + angle * (0.5 + partAngle_difference)) * partRadius;
    curveVertex(sx, sy);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (windowWidth > windowHeight) {
    WindowSize = windowWidth * 1.75;
  } else {
    WindowSize = windowHeight * 1.75;
  }
}

function loaded() {
  document.body.style.background = "aliceblue";
  document.getElementById("medias").style.opacity = 1;
  document.getElementById("links").style.opacity = 1;

  if (ZoomClick == false) {
    document.getElementById("medias").style.opacity = 0;
    document.getElementById("links").style.opacity = 0;
    document.getElementById("star").style.zIndex= 4;
  } else {
    document.getElementById("medias").style.opacity = 1;
    document.getElementById("links").style.opacity = 1;
    document.getElementById("star").style.zIndex= 1;
  }
}

//grid: makes dynamic grid of media based on height
var grid;

function init() {
  grid = new Minigrid({
    container: '#medias',
    item: '.media',
    gutter: 25
  });
  grid.mount();
}

function update() {
  grid.mount();
}

setTimeout(init, delay);
window.addEventListener('resize', update);

//works: populates home media from .csv
var csvWorks = new XMLHttpRequest();
csvWorks.open("GET", "works/works.csv");
csvWorks.responseType = "blob";
csvWorks.send();

csvWorks.onload = function () {

  var works = csvWorks.response;

  var csvParser = new SimpleExcel.Parser.CSV();
  csvParser.setDelimiter(",");
  csvParser.loadFile(works, function () {

    var worksList = csvParser.getSheet();

    for (var i = 1; i < worksList.length; i++) {

      var work = worksList[i];

      var workName = work[0];
      var workFile = work[1];
      var workAlt = work[2];
      var workTag = work[3];
      var workFormat = work[4];

      var linkLink = document.createElement("a");
      linkLink.className = "work";
      linkLink.href = "/" + workFile;

      var container = document.createElement("div");
      container.className = "container";
      container.classList.add("media");
      linkLink.appendChild(container);

      var mediaMedia = document.createElement("img");
      mediaMedia.srcset = "works/" + workFile + "_600." + workFormat + ", " + "works/" + workFile + "_1200." + workFormat + " 2x";
      mediaMedia.src = "works/" + workFile + "_1200." + workFormat;
      mediaMedia.alt = workAlt;
      container.appendChild(mediaMedia);

      var overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.classList.add(workTag);
      container.appendChild(overlay);

      var overlayText = document.createElement("p");
      overlayText.classList.add("name");
      overlayText.appendChild(document.createTextNode(workName));
      overlay.appendChild(overlayText);

      document.getElementById('medias').appendChild(linkLink);
    }
  });
}

//tags: makes overlays opaque based on tag selection
function tag(tag) {

  var all = document.getElementsByClassName("overlay");
  var notTagged = document.querySelectorAll(".overlay:not(." + tag + ")");

  for (var i = 0; i < all.length; i++) {
    all[i].style.opacity = "";
  };

  for (var j = 0; j < notTagged.length; j++) {
    notTagged[j].style.opacity = 1;
  };
}