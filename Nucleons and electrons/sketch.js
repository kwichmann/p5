var pairs = 20;
var neutrons = 25;
var init_velocity = 1.;
var mass_ratio = 20;
var force_constant = 25;
var strong_force_range = 15;
var strong_force_mag = 0.3;

var max_force = 1;

var particles = [];

function setup() {
  createCanvas(600, 600);
  
  for(i = 0; i < pairs; i++) {
    var electron = new particle(width / 2 + random(-width / 4, width / 4), height / 2 + random(-height / 4, height / 4), 1, -1, false);
    particles.push(electron);
    var proton = new particle(width / 2 + random(-width / 4, width / 4), height / 2 + random(-height / 4, height / 4), mass_ratio, 1, true);
    particles.push(proton);
  }
  
  for(i = 0; i < neutrons; i++) {
  var neutron = new particle(width / 2 + random(-width / 4, width / 4), height / 2 + random(-height / 4, height / 4), mass_ratio, 0, true);
    particles.push(neutron);
  }
}

function draw() {
  background(0);
  
  for(i = 0; i < particles.length; i++) {
    particles[i].show();
  }
  
  for(i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  
  for(i = 0; i < particles.length; i++) {
    var f = createVector(0, 0);
    for(j = 0; j < particles.length; j++) {
      if (i != j) {
        f.add(particles[i].force(particles[j]));
      }
    }
  particles[i].accelerate(f);
  }
}

function particle(x, y, mass, charge, nucleon) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-init_velocity, init_velocity) / mass, random(-init_velocity, init_velocity) / mass);
  this.m = mass;
  this.q = charge;
  this.nucleon = nucleon;

  this.show = function() {
    var radius = sqrt(10 * this.m);
    if (this.q > 0) {
      fill(255, 0, 0);
    } else if(this.q < 0) {
      fill(0, 0, 255);
    } else {
      fill(255, 255, 255);
    }
    noStroke();
    ellipse(this.pos.x, this.pos.y, radius, radius);
  }
  
  this.update = function() {
    this.pos.add(this.vel);
    
    if (this.pos.x < 0) {
      this.pos.x += width;
    }
    if (this.pos.x > width) {
      this.pos.x -= width;
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
    }
    if (this.pos.y > height) {
      this.pos.y -= height;
    }
  }
  
  this.accelerate = function(force) {
    var acc = p5.Vector.div(force, this.m);
    this.vel.add(acc);
  }
  
  this.force = function(particle) {
    var relative = p5.Vector.sub(this.pos, particle.pos);
    var r = p5.Vector.dist(this.pos, particle.pos);
    constrain(r, .1, 1000.);
    relative.normalize();
    var f = p5.Vector.mult(relative, force_constant * this.q * particle.q / (r * r));
    if (this.nucleon && particle.nucleon && r < strong_force_range) {
      relative.mult(-strong_force_mag);
      f.add(relative);
    }
    if (f.mag() > max_force) {
      f.normalize();
      f.mult(max_force);
    }
    return f;
  }
}