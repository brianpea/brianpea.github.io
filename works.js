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

  document.getElementById("links").style.opacity = 0;
}

function draw() {
  setTimeout(loaded, 100);

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

  textCenterX = windowWidth - textRight - (welcomeWidth / 2);

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
  document.getElementById("work").style.opacity = 1;
  document.getElementById("links").style.opacity = 1;
  document.getElementById("loader").style.opacity = 0; 
  document.getElementById("loader").style.zIndex= 0;
  setTimeout(loaderOff, 500);

  if (ZoomClick == false) {
    document.getElementById("work").style.opacity = 0;
    document.getElementById("links").style.opacity = 0;
    document.getElementById("star").style.zIndex= 4;
    document.getElementById("loader").style.zIndex= 5;
  } else {
    document.getElementById("work").style.opacity = 1;
    document.getElementById("links").style.opacity = 1;
    document.getElementById("star").style.zIndex= 1;
    document.getElementById("loader").style.zIndex= 0;
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

//menu: hides/shows side links to make work area larger/smaller
var toggle = false;
var interval;

function menu() {
  clearInterval(interval);
  document.getElementById("menu").style.display = "none";
  document.getElementById("work").style.transition = "1s ease-out";

  if (toggle == true) {
    document.getElementById("work").style.width = "calc(65vw - 25px)";
    document.getElementById("work").ontransitionend = show;
  } else if (toggle == false) {
    document.getElementById("work").style.width = "100vw";
    document.getElementById("work").ontransitionend = hide;
  }
}

function show() {
  document.getElementById("menu").innerHTML = ">>>";
  document.getElementById("menu").style.display = "inline-block";
  document.getElementById("work").style.transition = "none";
  toggle = false;
  interval = setInterval(adjust, 1);
}

function hide() {
  document.getElementById("menu").innerHTML = "<<<";
  document.getElementById("menu").style.display = "inline-block";
  document.getElementById("work").style.transition = "none";
  toggle = true;
  interval = setInterval(adjust, 1);
}

function adjust() {
  if (window.innerWidth > 750) {
    document.getElementById("work").style.width = "calc(75vw - 25px)";
    document.getElementById("menu").style.display = "none";
  } else {
    if (toggle == true) {
      document.getElementById("work").style.width = "100vw";
      document.getElementById("menu").style.display = "inline-block";
    } else if (toggle == false) {
      document.getElementById("work").style.width = "calc(65vw - 25px)";
      document.getElementById("menu").style.display = "inline-block";
    }
  }
}

//modal: fullscreen image modal with alt test captions
if (document.querySelectorAll("img").length > 0) {
  var modalElement = document.createElement("div");
  modalElement.id = "modal";

  var modalContentElement = document.createElement("div");
  modalContentElement.id = "modalContent";

  var modalImgElement = document.createElement("img");
  modalImgElement.id = "modalImg";

  document.body.appendChild(modalElement);
  modalElement.appendChild(modalContentElement);
  modalContentElement.appendChild(modalImgElement);
}

var modal = document.getElementById("modal");
var modalImg = document.getElementById("modalImg");

var imgs = document.querySelectorAll("img");

for (var i = 0; i < imgs.length; i++) {
  imgs[i].onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  imgs[i].style.cursor = "pointer";
  modal.style.cursor = "pointer";

  modal.onclick = function() {modal.style.display = "none"};
};

//overflow: controls dynamic overflow css styling
setInterval(overflow, 1);

function overflow() {
  var content = document.getElementById("content").scrollHeight;
  var scrollbox = document.getElementById("scrollbox").scrollHeight;

  if (content >= scrollbox) {
    document.getElementById("content").style.top = "0";
    document.getElementById("content").style.transform = "translate(0, 0)";
  } else {
    document.getElementById("content").style.top = "50%";
    document.getElementById("content").style.transform = "translate(0, -50%)";
  }
}

if (document.querySelectorAll("img").length > 0) {
  setInterval(overflowModal, 1);

  function overflowModal() {
    var contentModal = document.getElementById("modalContent").scrollHeight;
    var scrollboxModal = document.getElementById("modal").scrollHeight;

    if (contentModal >= scrollboxModal) {
      document.getElementById("modalContent").style.top = "0";
      document.getElementById("modalContent").style.transform = "translate(-50%, 0)";
    } else {
      document.getElementById("modalContent").style.top = "50%";
      document.getElementById("modalContent").style.transform = "translate(-50%, -50%)";
    }
  }
}

// //password: reveals a password
// var locks = document.querySelectorAll('.lock');
// var keys = [];

// for (var i = 0; i < locks.length; i++) {
//   var lock = locks[i];
//   var lockNum = i + 1;
//   var lockId = "lock" + lockNum;
//   lock.id = lockId;

//   var key = lock.innerHTML;
//   keys.push(key);
//   var keyLink = "<a href='#' onclick='unlock(" + lockNum + ");'>Password</a>"

//   lock.innerHTML = keyLink;
// }

// function unlock(n) {
//   var lock = document.getElementById("lock" + n);
//   var key = keys[n - 1];
//   lock.innerHTML = key;
// }