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

  console.log(position);
  console.log(media.length);

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
