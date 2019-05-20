import { createScene, createCamera, createRenderer } from "./util";
import { createCube, createSphere, createTetra } from "./shapeUtil";
let gameEnd;
let point;
let speed;
let obstacleShapes = [];
let timeInterval;
let UserRandomShape;
let gamePause;
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
let requestID;
let TimeOutID;
const laneInterval = 100;
const UserCube = createCube(0, -200);
const UserSphere = createSphere(0, -200);
const UserTetra = createTetra(0, -200);
const userShape = [
  { type: "cube", object: UserCube },
  { type: "sphere", object: UserSphere },
  { type: "tetra", object: UserTetra }
];

function restart() {
  gameEnd = false;
  point = 0;
  speed = 1.5;
  gamePause = false;
  obstacleShapes.forEach(obstacleObject => {
    scene.remove(obstacleObject.object);
  });
  obstacleShapes = [];
  document.querySelector("div").classList.add("hidden");
  document.querySelector("div.point").textContent = `${point}`;
  timeInterval = 3000;
  let iniObject = randomUserObject();
  iniObject.object.position.x = 0;
  cancelAnimationFrame(requestID);
  clearTimeout(TimeOutID);
  animate();
  continouslyObstacleRenderer();
}

function pause() {
  gamePause = true;
  cancelAnimationFrame(requestID);
  clearTimeout(TimeOutID);
}
document.querySelector("button.pause").addEventListener("click", pause);
function resume() {
  if (gamePause) {
    continouslyObstacleRenderer();
    animate();
    gamePause = false;
  }
}
document.querySelector("button.resume").addEventListener("click", resume);
document.querySelector("button.restart").addEventListener("click", restart);

restart();
function randomUserObject() {
  let index = Math.floor(Math.random() * Math.floor(3));
  let userPositionX = 0;
  if (UserRandomShape) {
    userPositionX = UserRandomShape.object.position.x;
    scene.remove(UserRandomShape.object);
  }
  UserRandomShape = userShape[index];
  UserRandomShape.object.position.x = userPositionX;
  scene.add(UserRandomShape.object);
  return UserRandomShape;
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  const keyCode = event.which;
  console.log(keyCode);
  switch (keyCode) {
    case 37:
      // key left
      UserRandomShape.object.position.x -= laneInterval;
      if (UserRandomShape.object.position.x <= -laneInterval) {
        UserRandomShape.object.position.x = -laneInterval;
      }
      break;
    case 39:
      // key right
      UserRandomShape.object.position.x += laneInterval;
      if (UserRandomShape.object.position.x >= laneInterval) {
        UserRandomShape.object.position.x = laneInterval;
      }
      break;
    case 83:
      // key s
      restart();
      break;
    case 65:
      // key a
      pause();
      break;
    case 82:
      resume();
      break;
  }
}

function animate() {
  if (!gameEnd) {
    requestID = requestAnimationFrame(animate);
    obstacleShapes.forEach(obstacleObject => {
      obstacleObject.object.position.y -= speed;
    });

    renderer.render(scene, camera);
    gameOver(UserRandomShape, obstacleShapes);
    obstacleShapes = clearPassedShapes(obstacleShapes);
  }
}

// animate();

function gameOver(UserRandomShape, obstacleShapes) {
  obstacleShapes.forEach(obstacleObject => {
    if (
      obstacleObject.object.position.y - UserRandomShape.object.position.y <=
        speed &&
      obstacleObject.object.position.y > UserRandomShape.object.position.y
    ) {
      if (
        UserRandomShape.object.position.x !==
          obstacleObject.object.position.x &&
        obstacleObject.type === UserRandomShape.type
      ) {
        document.querySelector("div").classList.remove("hidden");
        gameEnd = true;
      } else if (
        UserRandomShape.object.position.x ===
          obstacleObject.object.position.x &&
        obstacleObject.type === UserRandomShape.type
      ) {
        pointAccumulator(gameEnd);
        speeding();
        randomUserObject();
      }
    }
  });
}
function pointAccumulator(gameEnd) {
  if (!gameEnd) {
    point += 1;
  }
  document.querySelector("div.point").textContent = `${point}`;
}

function clearPassedShapes(obstacleShapes) {
  return obstacleShapes
    .map(obstacleObject => {
      if (
        obstacleObject.object.position.y <= UserRandomShape.object.position.y
      ) {
        scene.remove(obstacleObject.object);
        return undefined;
      } else {
        return obstacleObject;
      }
    })
    .filter(obstacleObject => obstacleObject !== undefined);
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function continouslyObstacleRenderer() {
  TimeOutID = setTimeout(() => {
    const xCoordinate = [0, laneInterval, -laneInterval];
    shuffle(xCoordinate);
    const cube = createCube(xCoordinate[0]);
    const sphere = createSphere(xCoordinate[1]);
    const tetra = createTetra(xCoordinate[2]);
    obstacleShapes.push(
      { type: "cube", object: cube },
      { type: "sphere", object: sphere },
      { type: "tetra", object: tetra }
    );
    scene.add(cube, sphere, tetra);
    continouslyObstacleRenderer();
  }, timeInterval);
}

function speeding() {
  if (point % 3 === 0 && point != 0) {
    speed *= 1.3;
    timeInterval *= 0.9;
  }
}
