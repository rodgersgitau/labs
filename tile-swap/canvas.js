// Game Variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let difficulty = 0;

// Draw Functions
function drawImage() {
  let imageObj = new Image();
  imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
  };
  imageObj.src = "images/poster.jpg";
}

function draw() {
  drawImage();
}
draw();
