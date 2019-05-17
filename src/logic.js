const Userdata = {
  x: 0,
  y: 0,
  z: -2200,
  type: "cube"
};

const obstacle = ["triangle", "sphere", "cube"];
const obstacle2 = ["triangle2", "sphere2", "cube2"];
const Usershape = ["triangle", "sphere", "cube"];
export function update() {
  data.obstacleDefaultPosition += 1;
}
export function gameover() {
  if (data.top === data.obstacleDefaultPosition) {
    console.log("gameover");
  }
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  console.log("keydown", event.which);
  var keyCode = event.which;
  if (keyCode == 40) {
    data.top += 40;
  } else if (keyCode == 38) {
    data.top -= 40;
  } else if (keyCode == 37) {
    data.left -= 40;
    if (data.left <= 40) {
      data.left = 40;
    }
  } else if (keyCode == 39) {
    data.left += 40;
    if (data.left >= 120) {
      data.left = 120;
    }
  }
}

export { data };
export { obstacle, obstacle2 };
