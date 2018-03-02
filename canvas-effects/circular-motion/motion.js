// Inital Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})


// Utitlity Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


// Objects
function Object(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color
}

Object.prototype.update = function () {
  this.draw
}

Object.prototype.draw = function () {
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = this.color
  ctx.fill()
  ctx.closePath()
}


// Implementation
let objects;

function init() {
  objects = []

  for (let i = 0; i < 2; i++) {
    // objects.push();
  }
}

// Animatation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // objects.forEach(object => {
  //   object.update();
  // });
}

init();
animate();