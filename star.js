function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(240, 248, 255);
  var radius1;
  var radius2 = 125;

  if (windowWidth > windowHeight) {
    radius1 = windowWidth * 1;
  } else {
    radius1 = windowHeight * 1;
  }

  var npoints = 9;

  push();
  translate(windowWidth * 0.5, windowHeight * 0.5);
  rotate(-HALF_PI);

  stroke(255, 255, 0);
  fill(255, 255, 0);
  star(0, 0, radius1, radius2, npoints);
  pop();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfRadius = radius2 + ((radius1 - radius2) / 2)

  curveTightness(0.2);

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
