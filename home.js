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

var animationFrames = ["|||","|||","|||","/||","//|","///","///","///","|//","||/"];
var animationFramerate = 100;
animator(animationFrames, animationFramerate);

function animator(frames, framerate) {
  var i = -1;
  setInterval(
    function() {
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
    radius1Multiplier = 1.3;
    radius2Multiplier = radius2Multiplier * 2;
    tightnessMultiplier = 1.5;
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

  function mapper (number, inMin, inMax, outMin, outMax) {
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

  // let textRef = document.getElementById("nav");
  // // let welcomeRef = document.getElementById("welcome");

  // // let textRight = 25;
  // // let welcomeWidth = welcomeRef.offsetWidth;

  // // textCenterX = windowWidth - textRight - (welcomeWidth / 2);
  // textCenterX = windowWidth - (textRef.offsetWidth / 2);

  // // let textTop = textRef.offsetTop;
  // // let textHeight = textRef.offsetHeight;
  // // let welcomeHeight = welcomeRef.offsetHeight;
  // // let em = windowWidth * 0.015;
  // // let padding = 25;

  // // textCenterY = textTop - (textHeight / 2) + ((em * mobileMultiplier) + padding) + (em * mobileMultiplier) + (welcomeHeight / 2);
  // textCenterY = windowHeight / 2;

  var welcomeRef = document.getElementById("welcome");
  textCenterX = welcomeRef.getBoundingClientRect().left + (welcomeRef.offsetWidth / 2);
  textCenterY = welcomeRef.getBoundingClientRect().top + (welcomeRef.offsetHeight / 2);

  clear();

  // let scrollHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  // let scrollMap = map(window.scrollY, 0, scrollHeight - window.windowHeight, 0, 0.5);

  let Spin = round(SpinStart + ((millis() / 1000) * TWO_PI) / SecsPerSpin + window.scrollY / 2500, 5);

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
window.addEventListener('scroll', update);
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

      var linkList = document.createElement("li");
      var linkLink = document.createElement("a");
      linkLink.className = "work";
      linkLink.href = "/" + workFile;
      linkList.appendChild(linkLink);

      var container = document.createElement("div");
      container.className = "container";
      container.classList.add("media");
      linkLink.appendChild(container);

      if (workFormat == "jpg" || workFormat == "gif") {
        var mediaMedia = document.createElement("img");
        mediaMedia.className = "lazy";
        mediaMedia.src = "works/" + workFile + "_300." + workFormat;
        mediaMedia.dataset.src = "works/" + workFile + "_1200." + workFormat;
        mediaMedia.dataset.srcset = "works/" + workFile + "_300." + workFormat + " 300w, works/" + workFile + "_600." + workFormat + " 600w, works/" + workFile + "_1200." + workFormat + " 1200w";
        mediaMedia.alt = workAlt;
        mediaMedia.addEventListener("load", update);
        container.appendChild(mediaMedia);
      }
      
      // if (workFormat == "mp4") {
      //   var mediaTag = document.createElement("video");
      //   mediaTag.className = "lazy";
      //   mediaTag.autoplay = true;
      //   mediaTag.loop = true;
      //   mediaTag.muted = true;
      //   mediaTag.setAttribute('playsinline',"");
      //   // mediaTag.poster = "works/" + workFile + "_placer.jpg";
      //   container.appendChild(mediaTag);

      //   var mediaMedia = document.createElement("source");
      //   mediaMedia.dataset.src = "works/" + workFile + "." + "webm";
      //   mediaMedia.type = "video/webm; codecs=vp9";
      //   mediaMedia.addEventListener("load", update);
      //   mediaTag.appendChild(mediaMedia);
      // }

      var overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.classList.add(workTag);
      container.appendChild(overlay);

      var overlayText = document.createElement("p");
      overlayText.classList.add("name");
      overlayText.appendChild(document.createTextNode(workName));
      overlay.appendChild(overlayText);

      document.getElementById('medias').appendChild(linkList);
    };
  });
}

//lazyloader: loads media lazily via intersection observer
document.addEventListener("DOMContentLoaded", function() {
  var lazyImgs = [].slice.call(document.querySelectorAll("img.lazy"));
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImgObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(image) {
        if (image.isIntersecting) {
          let lazyImg = image.target;
          lazyImg.src = lazyImg.dataset.src;
          lazyImg.srcset = lazyImg.dataset.srcset;
          lazyImg.classList.remove("lazy");
          lazyImgObserver.unobserve(lazyImg);
        };
      });
    });

    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            };
          };

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyImgs.forEach(function(lazyImg) {
      lazyImgObserver.observe(lazyImg);
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  };
});

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

//overflow menus: compresses menus into a sidebar in mobile
// if (window.innerWidth <= 750) {
//   var overflow = document.getElementsByClassName("overflow");

//   for (var i = 0; i < overflow.length; i++) {
//     var overflowTitle = document.getElementsByClassName("overflowtitle")[i];

//     var overflowLink = document.createElement("a");
//     overflowLink.appendChild(document.createTextNode(overflowTitle.innerText));
//     overflowLink.href = "javascript:void(0);";
//     overflowLink.setAttribute("onclick", "menu('show" + [i + 1] + "')");

//     overflowTitle.innerText = "";
//     overflowTitle.appendChild(overflowLink);

//     var overflowSib = overflowTitle.parentElement.nextElementSibling;

//     while(overflowSib) {
//       var overflowSibKids = overflowSib.children[0];
//       overflowSib = overflowSib.nextElementSibling;
//     };
//   }

//   function menu(state) {
//     if (state == "show1") {
//       console.log("show1"); 
//     };
//     if (state == "show2") {
//       console.log("show2"); 
//     };
//   };
// }
