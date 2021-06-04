let SpinStart;
let SpinPosition;
let WindowSize;

let Scale = 1;
let ScaleLimit;
let Zoom = 0;
let ZoomSwitch;

let Background = "AliceBlue";

function setup() {
  frameRate(24);
  var canvas = createCanvas(windowWidth, windowHeight - 1);
  canvas.parent('star');

  SpinPosition = float(getItem('Spin'));

  if (SpinStart === undefined) {
    SpinStart = random(-PI, PI);
  }

  if (isNaN(SpinPosition) === false) {
    SpinStart = SpinPosition;
  }

  if (windowWidth > windowHeight) {
    WindowSize = windowWidth;
  } else {
    WindowSize = windowHeight;
  }

  document.getElementById("welcome").style.display = "inline-block";
  document.getElementById("brian").style.display = "none";
  document.getElementById("exit").style.display = "none";
}

function draw() {
  let Background = "AliceBlue";
  let Color = "Yellow";
  let Radius1 = WindowSize * 1.25;
  let Radius2 = 150;
  let Points = 9;
  let Tightness = 0.175;
  let SecsPerSpin = Points * (60 / Points);

  Scale += Zoom;

  if (ZoomSwitch == true) {
    Zoom += 0.00625;
    document.getElementById("welcome").style.display = "none";

    if (windowWidth <= 750) {
      ScaleLimit = 4.75;
    } else {
      ScaleLimit = 3.75;
    }

    if (Scale >= ScaleLimit) {
      Zoom = 0;
      document.getElementById("brian").style.display = "inline-block";
      document.getElementById("exit").style.display = "inline-block";
    }
  } else if (ZoomSwitch == false) {
    Zoom -= 0.00625;
    document.getElementById("brian").style.display = "none";
    document.getElementById("exit").style.display = "none";

    if (Scale <= 1) {
      Zoom = 0;
      Scale = 1;
      document.getElementById("welcome").style.display = "inline-block";
    }
  }

  // console.log(Zoom);
  // console.log(Scale);
  // console.log(ZoomSwitch);

  background(color(Background));

  let Spin = round(SpinStart + (((millis() / 1000) * TWO_PI) / SecsPerSpin), 5);

  push();
  translate(windowWidth * 0.5, windowHeight * 0.5);
  scale(Scale, (Scale / 2));
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
  scale();
  let partRadius_scale = 1.7;
  let partAngle_difference = map(WindowSize, 750, 2500, 0.001, 0.14);

  // console.log(WindowSize);
  // console.log(partAngle_difference);

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

  if (windowWidth > windowHeight) {
    WindowSize = windowWidth;
  } else {
    WindowSize = windowHeight;
  }
}

function zoomIn() {
  ZoomSwitch = true;
  slideshow(position);
}

function zoomOut() {
  ZoomSwitch = !ZoomSwitch;
  position = 1;
}