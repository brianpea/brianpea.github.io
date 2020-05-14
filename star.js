let Background;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 1);
  canvas.parent('star');

  Background = color(240, 248, 255);
}

function draw() {
  let Color = color(255, 255, 0);
  let Radius1_scale = 1;
  let Radius2 = 125;
  let Points = 9;
  let Tightness = 0.25;
  let Animate = millis() / 60000 * 60;

  background(Background);

  let radius1;
  if (windowWidth > windowHeight) {
    radius1 = windowWidth * Radius1_scale;
  } else {
    radius1 = windowHeight * Radius1_scale;
  }

  push();
  translate(windowWidth * 0.5, windowHeight * 0.5);
  rotate(-HALF_PI);
  stroke(Color);
  fill(Color);
  curveTightness(Tightness);

  star(0, 0, radius1, Radius2, Points);
  pop();
}

function star(x, y, radius1, radius2, points) {
  let angle = TWO_PI / points;
  let halfRadius = radius2 + ((radius1 - radius2) / 2)

  beginShape();
  for (let a = 0; a <= TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    curveVertex(sx, sy);

    sx = x + cos(a + angle * 0.475) * halfRadius;
    sy = y + sin(a + angle * 0.475) * halfRadius;
    curveVertex(sx, sy);

    sx = x + cos(a + angle * 0.5) * radius1;
    sy = y + sin(a + angle * 0.5) * radius1;
    curveVertex(sx, sy);

    sx = x + cos(a + angle * 0.525) * halfRadius;
    sy = y + sin(a + angle * 0.525) * halfRadius;
    curveVertex(sx, sy);
  }
  endShape();
}

function mousePressed() {
  Background = color(240, 248, 255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
