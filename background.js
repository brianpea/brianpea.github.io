function background() {
  var colors = ["gold", "aliceblue", "thistle", "papayawhip", "orange", "tomato", "limegreen", "lightpink"];

  var lottery = Math.floor(Math.random() * colors.length);
  var color = colors[lottery];

  var currentColor = document.body.style.background;

  if (currentColor == color) {
    lottery = Math.floor(Math.random() * colors.length);
    color = colors[lottery];
  }

  document.body.style.background = color;
}