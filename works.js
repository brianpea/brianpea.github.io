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
  setTimeout(loaded, 100);

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

document.body.style.overflow = "hidden";

function loaded() {
  document.body.style.overflow = "auto";
  document.body.style.background = "aliceblue";
  document.getElementById("work").style.opacity = 1;
  document.getElementById("nav").style.opacity = 1;
  document.getElementById("loader").style.opacity = 0;
  document.getElementById("loader").style.zIndex = 0;
  setTimeout(loaderOff, 500);

  if (ZoomClick == false) {
    document.body.style.overflow = "hidden";
    document.getElementById("work").style.opacity = 0;
    document.getElementById("nav").style.opacity = 0;
    document.getElementById("star").style.zIndex = 4;
    document.getElementById("loader").style.zIndex = 5;
  } else {
    document.body.style.overflow = "auto";
    document.getElementById("work").style.opacity = 1;
    document.getElementById("nav").style.opacity = 1;
    document.getElementById("star").style.zIndex = 1;
    document.getElementById("loader").style.zIndex = 0;
    setTimeout(loaderOff, 500);
  }
}

//gallery: makes a media slideshow with arrows
var prevIcon = "<"
var nextIcon = ">"

var mediaCount = document.getElementsByClassName('media').length;

if (mediaCount != 0) {
  var arrowIcons = "<a id='prev' href='#' onclick='arrow(-1);'>" + prevIcon + "</a><a id='next' href='#' onclick='arrow(1);'>" + nextIcon + "</a>"

  document.getElementsByClassName('gallery')[0].insertAdjacentHTML('beforeend', arrowIcons);

  var position = 1;
  gallery(position);

  function arrow(n) {
    gallery(position += n);
  }

  function gallery() {
    var media = document.getElementsByClassName("media");

    for (var i = 0; i < media.length; i++) {
      media[i].style.display = "none";
    }

    media[position - 1].style.display = "inline-block";

    if (position == 1) {
      document.getElementById("prev").style.display = "none";
    } else {
      document.getElementById("prev").style.display = "inline-block";
    }
    if (position == media.length) {
      document.getElementById("next").style.display = "none";
    } else {
      document.getElementById("next").style.display = "inline-block";
    }
  }
}

//mediascale: dynamically maps media scaling to aspect ratio (smallest at 1:1 ratio)
function mediascale() {

  var scaleMin = 0.5625;
  var scaleMax = 0.8125;

  var medias = document.getElementsByClassName('media');
  var refWidth = document.getElementById("media").offsetWidth;

  for (var i = 0; i < medias.length; i++) {
    var media = medias[i];
    var ratio, ratioMap;

    if (media.querySelector("#wide") !== null) {
      ratio = 16 / 9;
    } else if (media.querySelector("#full") !== null) {
      ratio = 4 / 3;
    } else if (media.querySelector("#sq") !== null) {
      ratio = 1 / 1;
    } else {
      ratio = media.width / media.height;
    }

    if (ratio > 1) {
      ratioMap = 1 / ratio;
    } else {
      ratioMap = ratio;
    }

    function mapper(number, inMin, inMax, outMin, outMax) {
      if (number < inMin) {
        return outMin;
      } else if (number > inMax) {
        return outMax;
      } else {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      };
    }

    if (window.innerWidth <= 750 && window.innerHeight > 500) {
      scaleMin = scaleMax;
    }

    var scaleAmount = mapper(ratioMap, 0.5, 1, scaleMax, scaleMin);

    if (ratio < 1) {
      media.style.width = (refWidth * scaleAmount * ratio) + "px";
    } else {
      media.style.width = (refWidth * scaleAmount) + "px";
    }
    media.style.maxWidth = "none";
    media.style.maxHeight = "none";
  }
}

window.addEventListener("load", mediascale);
window.addEventListener("resize", mediascale);
window.addEventListener("orientationchange", mediascale);

//modal: fullscreen image modal (maybe with alt text captions one day)
var pics = document.querySelectorAll("picture");
var modal, modalContent, modalImg, modalPaddingOffset;

if (pics.length > 0) {
  var modalElement = document.createElement("div");
  modalElement.id = "modal";

  var modalContentElement = document.createElement("div");
  modalContentElement.id = "modalContent";

  var modalPictureElement = document.createElement("picture");
  var modalSourceElement = document.createElement("source");
  var modalImgElement = document.createElement("img");
  modalImgElement.id = "modalImg";

  document.body.appendChild(modalElement);
  modalElement.appendChild(modalContentElement);
  modalContentElement.appendChild(modalPictureElement);
  modalPictureElement.appendChild(modalSourceElement);
  modalPictureElement.appendChild(modalImgElement);

  modal = document.getElementById("modal");
  modalContent = document.getElementById("modalContent");
  modalImg = document.getElementById("modalImg");
  modalPaddingOffset = parseInt(window.getComputedStyle(modalContent).padding) * 2;
}

for (var i = 0; i < pics.length; i++) {
  pics[i].onclick = function () {
    modal.style.display = "block";
    modal.querySelector("source").srcset = this.children[0].srcset;
    modalImg.src = this.children[1].src;

    if (modalImg.complete) {
      imagescale();
    } else {
      modalImg.addEventListener("load", imagescale);
    }

  };

  pics[i].style.cursor = "pointer";
  modal.style.cursor = "pointer";

  modal.onclick = function () { modal.style.display = "none" };
};

function imagescale() {
  var imgWidth = modalImg.width;
  var imgHeight = modalImg.height;

  var windowRatio = window.innerWidth / window.innerHeight;
  var imgRatio = imgWidth / imgHeight;

  var modalImgWidth = window.innerWidth - modalPaddingOffset;
  var modalImgHeight = window.innerHeight - modalPaddingOffset;

  if (modalImgWidth > 1200) {
    modalImgWidth = 1200;
    modalImgHeight = 1200 / imgRatio;
  }

  if (windowRatio > imgRatio) {
    modalImg.style.width = modalImgWidth - getScrollbarWidth() + "px";
    modalImg.style.height = "auto";
    modal.style.overflowX = "hidden";
    modal.style.overflowY = null;
  } else if (windowRatio < imgRatio) {
    modalImg.style.width = null;
    modalImg.style.height = modalImgHeight - getScrollbarWidth() + "px";
    modal.style.overflowX = null;
    modal.style.overflowY = "hidden";
  } else {
    modalImg.style.width = modalImgWidth + "px";
    modalImg.style.height = null;
    modal.style.overflowX = "hidden";
    modal.style.overflowY = "hidden";
  }

  var scrollToX = (imgWidth - window.innerWidth + modalPaddingOffset) / 2;
  var scrollToY = (imgHeight - window.innerHeight + modalPaddingOffset) / 2;
  modal.scrollTo(scrollToX, scrollToY);
}

window.addEventListener('resize', imagescale);

//overflow: controls dynamic horizontal overflow styling (center on screen to top aligned)
setInterval(overflow, 1);

function overflow() {
  var content = document.getElementById("content");
  var work = document.getElementById("work");

  if (content.scrollHeight >= work.scrollHeight) {
    content.style.top = "0";
    content.style.transform = "translate(0, 0)";
  } else {
    content.style.top = "50%";
    content.style.transform = "translate(0, -50%)";
  }
}

if (document.querySelectorAll("img").length > 0) {
  setInterval(overflowModal, 1);

  function overflowModal() {
    var contentModal = document.getElementById("modalContent");

    if (contentModal.scrollHeight > window.innerHeight) {
      contentModal.style.top = "0";
      contentModal.style.left = "50%";
      contentModal.style.transform = "translate(-50%, 0)";
    } else if (contentModal.scrollWidth > window.innerWidth) {
      contentModal.style.top = "0";
      contentModal.style.left = "0";
      contentModal.style.transform = "translate(0, 0)";
    } else {
      contentModal.style.top = "50%";
      contentModal.style.left = "50%";
      contentModal.style.transform = "translate(-50%, -50%)";
    }
  }
}

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