let Background;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 1);
  canvas.parent('star');

  Background = color(240, 248, 255);
}

function draw() {
  let Color = color(255, 255, 0);
  let Radius1_scale = 1.5;
  let Radius2 = 150;
  let Points = 9;
  let scaleX = 1;
  let scaleY = 0.5;
  let Tightness = 0.25;
  let Animate = (millis() / 1000) / 10;

  background(Background);

  let radius1;
  if (windowWidth > windowHeight) {
    radius1 = windowWidth * Radius1_scale;
  } else {
    radius1 = windowHeight * Radius1_scale;
  }

  push();
  translate(windowWidth * 0.5, windowHeight * 0.5);
  scale(scaleX, scaleY);
  rotate(-HALF_PI + Animate);
  stroke(Color);
  fill(Color);
  curveTightness(Tightness);

  star(0, 0, radius1, Radius2, Points);
  pop();
}

function star(x, y, radius1, radius2, points) {
  let partRadius_scale = 0.3;
  let partAngle_difference = 0.05;

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

function mousePressed() {
  Background = color(240, 248, 255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
