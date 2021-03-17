function work(n) {
  var links = document.getElementsByClassName("links");
  var media = document.getElementsByClassName("media");

  for (var i = 0; i < links.length; i++) {
    links[i].style.display = "none";
  }
  for (var i = 0; i < media.length; i++) {
    media[i].style.display = "none";
  }

  var link = "link" + n;
  var img = "img" + n;

  document.getElementById(link).style.display = "inline-block";
  document.getElementById(img).style.display = "inline-block";
}
