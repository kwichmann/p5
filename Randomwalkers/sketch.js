var w = [];
var n = 10;

function setup() {
  createCanvas(640, 400);
  background(255);
  for (var i = 0; i < n; i++) {
    walker = new Walker(width/2, height/2);
    w.push(walker);
  }
}

function draw() {
  for (var i = 0; i < w.length; i++) {
    w[i].display();
    w[i].move();  
  }
}

function mousePressed() {
  walker = new Walker(mouseX, mouseY);
  w.push(walker);
}

function Walker(x, y) {
  this.pos = createVector(x, y);
  
  this.r = random(0,255);
  this.g = random(0,255);
  this.b = random(0,255);
  
  this.display = function() {
    fill(this.r, this.g, this.b, 50);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
  
  this.move = function() {
    var vel = createVector(random(-3, 3), random(-3, 3));
    this.pos.add(vel);
  }
}