//vh: fixes vh for mobile
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//slides: makes divs into a slideshow with arrows
function slideshow() {
  var slide = document.getElementsByClassName("slide");

  for (var i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
  }

  slide[position - 1].style.display = "inline-block";

  if (position == 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }
  if (position == slide.length) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
}

//star: checks for locally stored values
let ZoomSwitch;
let ZoomClick;

function setup() {
}

function draw() {
    ZoomSwitch = getItem('ZoomSwitch');
    ZoomClick = getItem('ZoomClick');
}

//slides: makes a slideshow with arrows
var prevIcon = "<"
var nextIcon = ">"

var arrowIcons = "<a id='prev' href='#' onclick='arrow(-1); return false'><span id='prevlink'>" + prevIcon + "</span></a><a id='next' href='#' onclick='arrow(1); return false'><span id='nextlink'>" + nextIcon + "</span></a>"

document.getElementsByClassName('slideshow')[0].insertAdjacentHTML('beforeend', arrowIcons);

var position = 1;
slideshow(position);

function arrow(n) {
  slideshow(position += n);
}

//back
function back() {
  document.getElementById("about").style.opacity = 0;
  setTimeout(backPage, 250);

  function backPage() {
    window.location.href = document.referrer;
  }
}

document.getElementById("about").style.opacity = 1;