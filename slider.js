var prevIcon = "<"
var nextIcon = ">"

var arrowIcons = "<a id='prev' href='#' onclick='arrow(-1);'><span id='prevlink'>" + prevIcon + "</span></a><a id='next' href='#' onclick='arrow(1);'><span id='nextlink'>" + nextIcon + "</span></a>"

document.getElementsByClassName('slideshow')[0].insertAdjacentHTML('beforeend', arrowIcons);

var position = 1;
slideshow(position);

function arrow(n) {
  slideshow(position += n);
}

function slideshow() {
  var slide = document.getElementsByClassName("slide");

  for (var i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
  }

  slide[position - 1].style.display = "inline-block";

  if (position == 1) {
    document.getElementById("prev").style.display = "none";
  } else {
    document.getElementById("prev").style.display = "inline-block";
  }
  if (position == slide.length) {
    document.getElementById("next").style.display = "none";
  } else {
    document.getElementById("next").style.display = "inline-block";
  }
}

