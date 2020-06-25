let Background;
let SpinStart;
let SpinPosition;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 1);
  canvas.parent('star');

  SpinPosition = float(getItem('Spin'));

  if (SpinStart === undefined) {
    SpinStart = random(-PI, PI);
  }

  if (isNaN(SpinPosition) === false) {
    SpinStart = SpinPosition;
  }
}

function draw() {
  let Background = "AliceBlue";
  let Color = "Yellow";
  let Radius1 = 1440;
  let Radius2 = 150;
  let Points = 9;
  let ScaleX = 1;
  let ScaleY = 0.5;
  let Tightness = 0.15;
  let SecsPerSpin = 600 * Points;

  background(color(Background));

  let Spin = round(SpinStart + (((millis() / 1000) * TWO_PI) / SecsPerSpin), 5);

  push();
  translate(windowWidth * 0.5, windowHeight * 0.5);
  scale(ScaleX, ScaleY);
  rotate(Spin);
  stroke(color(Color));
  strokeWeight(5);
  fill(color(Color));
  curveTightness(Tightness);

  star(0, 0, Radius1, Radius2, Points);
  pop();
  SpinPosition = storeItem('Spin', str(Spin));
}

function star(x, y, radius1, radius2, points) {
  let partRadius_scale = 1.7;
  let partAngle_difference = 0.035;

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
}
