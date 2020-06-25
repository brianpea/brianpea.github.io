var prevIcon = "<⸺"
var nextIcon = "⸺>"

var arrowIcons = "<a id='prev' href='#' onclick='arrow(-1);'><span id='prevlink'>" + prevIcon + "</span></a><a id='next' href='#' onclick='arrow(1);'><span id='nextlink'>" + nextIcon + "</span></a>"

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
