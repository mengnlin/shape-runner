import { data, obstacle, update, gameover, shape, obstacle2 } from "./logic";
function createDiv() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  return div;
}

function removeDiv(div) {
  return document.body.removeChild(div);
}

const div = createDiv();
const triangleDiv = createDiv();
const sphereDiv = createDiv();
const cubeDiv = createDiv();

const triangleDiv2 = createDiv();
const sphereDiv2 = createDiv();
const cubeDiv2 = createDiv();
const map = {
  triangle: triangleDiv,
  sphere: sphereDiv,
  cube: cubeDiv,
  triangle2: triangleDiv2,
  sphere2: sphereDiv2,
  cube2: cubeDiv2
};
// Object.values(map).map(function(div) {
//   if (parseInt(div.style.top) >= 350) {
//     removeDiv(div);
//   }
// });

function animate() {
  requestAnimationFrame(animate);

  div.style.top = data.top + "px";
  div.style.left = data.left + "px";
  map[obstacle[0]].style.top = data.obstacleDefaultPosition + "px";
  map[obstacle[0]].style.left = "40px";
  map[obstacle[1]].style.top = data.obstacleDefaultPosition + "px";
  map[obstacle[1]].style.left = "80px";
  map[obstacle[2]].style.top = data.obstacleDefaultPosition + "px";
  map[obstacle[2]].style.left = "120px";

  map[obstacle2[0]].style.top = data.obstacleDefaultPosition + 120 + "px";
  map[obstacle2[0]].style.left = "40px";
  map[obstacle2[1]].style.top = data.obstacleDefaultPosition + 120 + "px";
  map[obstacle2[1]].style.left = "80px";
  map[obstacle2[2]].style.top = data.obstacleDefaultPosition + 120 + "px";
  map[obstacle2[2]].style.left = "120px";

  update();
  gameover();
}

animate();
