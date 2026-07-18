var delay = 750;

//vh: fixes vh for mobile
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//loader: loading screen
var loader = document.getElementById("loader");

var loaderAnimation = document.createElement("p");
loader.appendChild(loaderAnimation);

var animationFrames = ["|||", "|||", "|||", "/||", "//|", "///", "///", "///", "|//", "||/"];
var animationFramerate = 100;
animator(animationFrames, animationFramerate);

function animator(frames, framerate) {
  var i = -1;
  setInterval(
    function () {
      loaderAnimation.innerHTML = frames[i];
      i++;
      i %= frames.length;
    },
    framerate
  );
}

function loaderOn() {
  loader.style.opacity = 1;
}

function loaderOff() {
  loader.style.display = "none";
}

setTimeout(loaderOn, 2475);

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

  document.getElementById("nav").style.opacity = 0;
}

function draw() {
  setTimeout(loaded, delay);

  let radius1Multiplier;
  let radius2Multiplier = 0.06;
  let tightnessMultiplier;

  if (windowWidth <= 750) {
    if (windowHeight <= 500) {
      radius1Multiplier = 1;
      tightnessMultiplier = 1;
    } else {
      radius1Multiplier = 1.3;
      radius2Multiplier = radius2Multiplier * 2;
      tightnessMultiplier = 1.5;
    }
  } else {
    radius1Multiplier = 1;
    tightnessMultiplier = 1;
  }

  let Color = "yellow";
  let Radius1 = WindowSize * radius1Multiplier;
  let Radius2 = windowWidth * radius2Multiplier;
  let Points = 9;
  let Tightness = map((windowWidth * 1.75), 0, (3500 / tightnessMultiplier), 1, 0);
  let SecsPerSpin = Points * 60;

  function mapper(number, inMin, inMax, outMin, outMax) {
    if (number < inMin) {
      return outMin;
    } else if (number > inMax) {
      return outMax;
    } else {
      return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
  }

  var zoomValue = mapper(windowWidth, 250, 1500, 0.02, 0.01);

  Scale += Zoom;

  if (ZoomSwitch == true && ZoomClick == true) {
    ZoomClick = false;
    ZoomMillis = millis();
  } else if (ZoomSwitch == true) {
    Zoom += zoomValue;

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
    Zoom -= zoomValue;

    if (Scale <= 1) {
      Zoom = 0;
      Scale = 1;
      ZoomSwitch = null;
      ZoomClick = null;
      removeItem("ZoomSwitch");
      removeItem("ZoomClick");
    }
  }

  var welcomeRef = document.getElementById("welcome");
  textCenterX = welcomeRef.getBoundingClientRect().left + (welcomeRef.offsetWidth / 2);
  textCenterY = welcomeRef.getBoundingClientRect().top + (welcomeRef.offsetHeight / 2);

  clear();

  let Spin = round(SpinStart + (((millis() / 1000) * TWO_PI) / SecsPerSpin) + (window.scrollY / 2500), 5);

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

document.body.style.overflow = "hidden";

function loaded() {
  document.body.style.overflow = "auto";
  document.body.style.background = "aliceblue";
  document.getElementById("medias").style.opacity = 1;
  document.getElementById("nav").style.opacity = 1;
  document.getElementById("loader").style.opacity = 0;
  document.getElementById("loader").style.zIndex = 0;
  setTimeout(loaderOff, 500);

  if (ZoomClick == false) {
    document.body.style.overflow = "hidden";
    document.getElementById("medias").style.opacity = 0;
    document.getElementById("nav").style.opacity = 0;
    document.getElementById("star").style.zIndex = 4;
    document.getElementById("loader").style.zIndex = 5;
  } else {
    document.body.style.overflow = "auto";
    document.getElementById("medias").style.opacity = 1;
    document.getElementById("nav").style.opacity = 1;
    document.getElementById("star").style.zIndex = 1;
    document.getElementById("loader").style.zIndex = 0;
    setTimeout(loaderOff, 500);
  }
}

//grid: makes dynamic grid of media based on height
var grid;

function init() {
  grid = new Minigrid({
    container: '#grid',
    item: '.grid',
    gutter: 25
  });
  grid.mount();
}

function update() {
  grid.mount();
}

setTimeout(init, delay);
window.addEventListener('scroll', update);
window.addEventListener('resize', update);

//works: populates home media into a banner or grid from .csv
var csvWorks = new XMLHttpRequest();
csvWorks.open("GET", "works/works.csv");
csvWorks.responseType = "blob";
csvWorks.send();

csvWorks.onload = function () {
  var worksDoc = csvWorks.response;

  var csvParser = new SimpleExcel.Parser.CSV();
  csvParser.setDelimiter(",");
  csvParser.loadFile(worksDoc, function () {

    var worksSheet = csvParser.getSheet();

    for (var i = 1; i < worksSheet.length; i++) {
      var work = worksSheet[i];

      var workDisplay = work[0];
      var workName = work[1];
      var workFile = work[2];
      var workTag = work[3];
      var workAlt = work[4];
      var isAnimation = work[5];

      if (workDisplay == "banner") {
        var bannerList = document.createElement("li");
        var bannerLink = document.createElement("a");
        var bannerBox = document.createElement("div");
        bannerBox.className = "bannerbox";
        bannerLink.href = "/" + workFile;
        bannerLink.appendChild(bannerBox);
        bannerList.appendChild(bannerLink);
        // bannerList.appendChild(bannerBox);

        // var bannerLink = document.createElement("a");
        var bannerText = document.createElement("p");
        bannerText.appendChild(document.createTextNode(workName));
        bannerText.className = "name";
        // bannerLink.href = "/" + workFile;
        // bannerLink.appendChild(bannerText);
        // bannerBox.appendChild(bannerLink);
        bannerBox.appendChild(bannerText);

        var bannerScroll = document.createElement("div");
        bannerScroll.className = "bannerscroll";
        bannerBox.appendChild(bannerScroll);

        var bannerMedias = document.createElement("div");
        bannerMedias.className = "bannermedias";
        bannerScroll.appendChild(bannerMedias);

        var bannerFile = workFile;

        var csvBanner = new XMLHttpRequest();
        csvBanner.open("GET", "works/banner_" + workFile + "/banner_" + workFile + ".csv");
        csvBanner.responseType = "blob";
        csvBanner.send();

        csvBanner.onload = function () {
          var bannerDoc = csvBanner.response;

          csvParser = new SimpleExcel.Parser.CSV();
          csvParser.setDelimiter(",");
          csvParser.loadFile(bannerDoc, function () {

            var bannerSheet = csvParser.getSheet();

            for (var j = 0; j < 2; j++) {
              for (var k = 1; k < bannerSheet.length; k++) {
                var bannerMedia = bannerSheet[k];

                var bannerMediaFile = bannerMedia[0];
                var bannerMediaAlt = bannerMedia[1];
                var isAnimation = bannerMedia[2];

                // var bannerImgLink = document.createElement("a");
                var bannerImg = document.createElement("img");
                // bannerImgLink.href = "/" + bannerFile;
                bannerImg.srcset = "works/banner_" + bannerFile + "/" + bannerMediaFile + "_300.webp 300w, works/banner_" + bannerFile + "/" + bannerMediaFile + "_600.webp 600w, works/banner_" + bannerFile + "/" + bannerMediaFile + "_1200.webp 1200w";
                bannerImg.sizes = "(max-width: 685px) 300px, (max-width: 750px) 600px, (max-width: 1600px) 300px, (max-width: 3200px) 600px, 1200px"

                if (isAnimation == "yes") {
                  bannerImg.src = "works/banner_" + bannerFile + "/" + bannerMediaFile + ".gif";
                } else {
                  bannerImg.src = "works/banner_" + bannerFile + "/" + bannerMediaFile + ".jpg";
                }

                bannerImg.alt = bannerMediaAlt;
                // bannerImgLink.appendChild(bannerImg);
                // bannerMedias.appendChild(bannerImgLink);
                bannerMedias.appendChild(bannerImg);
              }
            }
          });
        }

        // var overlay = document.createElement("div");
        // overlay.classList.add("overlay");
        // overlay.classList.add(workTag);
        // bannerBox.appendChild(overlay);

        document.getElementById('banner').appendChild(bannerList);

        bannerBox.style.paddingBottom = getScrollbarWidth() + 25 + "px";
        bannerScroll.style.paddingBottom = getScrollbarWidth() + "px";

      } else if (workDisplay == "grid") {
        var gridList = document.createElement("li");
        var gridLink = document.createElement("a");
        gridLink.className = "work";
        gridLink.href = "/" + workFile;
        gridList.appendChild(gridLink);

        var gridBox = document.createElement("div");
        gridBox.className = "gridbox";
        gridBox.classList.add("grid");
        gridLink.appendChild(gridBox);

        var gridImg = document.createElement("img");
        gridImg.srcset = "works/" + workFile + "_300.webp  300w, works/" + workFile + "_600.webp  600w, works/" + workFile + "_1200.webp  1200w";
        gridImg.sizes = "(max-width: 500px) 300px, (max-width: 750px) 600px, (max-width: 1300px) 300px, (max-width: 2500px) 600px, 1200px";

        if (isAnimation == "yes") {
          gridImg.src = "works/" + workFile + ".gif";
        } else {
          gridImg.src = "works/" + workFile + ".jpg";
        }

        gridImg.alt = workAlt;
        gridImg.addEventListener("load", update);
        gridBox.appendChild(gridImg);

        var overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.classList.add(workTag);
        gridBox.appendChild(overlay);

        var overlayText = document.createElement("p");
        overlayText.classList.add("name");
        overlayText.appendChild(document.createTextNode(workName));
        overlay.appendChild(overlayText);

        document.getElementById('grid').appendChild(gridList);
      }
    }
  });
}

//tags: makes overlays opaque based on tag selection
var tagClick = false;

function tag(tag) {
  var all = document.getElementsByClassName("overlay");
  var notTagged = document.querySelectorAll(".overlay:not(." + tag + ")");

  for (var i = 0; i < all.length; i++) {
    all[i].style.opacity = "";
  };

  for (var j = 0; j < notTagged.length; j++) {
    notTagged[j].style.opacity = 1;
  };

  tagClick = true;
}

function untag() {
  var clickArea = document.querySelectorAll("a");

  for (var i = 0; i < clickArea.length; i++) {
    var areaLink = clickArea[i];
    areaLink.addEventListener("click", ignore);

    function ignore() {
      tagClick = true;
    };
  };

  if (tagClick == false) {
    var all = document.getElementsByClassName("overlay");

    for (var j = 0; j < all.length; j++) {
      all[j].style.opacity = "";
    };
  } else {
    tagClick = false;
  };
}

document.addEventListener("click", untag);

//scrollbar width: gets scrollbar width to calculate some styling
function getScrollbarWidth() {
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  var inner = document.createElement('div');
  outer.appendChild(inner);

  var scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};