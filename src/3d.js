import * as THREE from "three";
const scene = new THREE.Scene();
const sceneWidth = window.innerWidth / 2;
const sceneHeight = window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  35,
  sceneWidth / sceneHeight,
  0.1,
  3000
);

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWidth, sceneHeight);
renderer.setClearColor(0xf8f3e9);
document.body.appendChild(renderer.domElement);

const obstacleY = 600;
const obstacleZ = -1000;

function createCube(x, y = obstacleY) {
  const geometry = new THREE.BoxGeometry(25, 25, 25);
  const material = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = obstacleZ;
  return cube;
}

function createSphere(x, y = obstacleY) {
  const geometry2 = new THREE.SphereGeometry(15);
  const material2 = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const sphere = new THREE.Mesh(geometry2, material2);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = obstacleZ;
  return sphere;
}

function createTetra(x, y = obstacleY) {
  const geometry3 = new THREE.TetrahedronGeometry(20);
  const material3 = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const Tetra = new THREE.Mesh(geometry3, material3);
  Tetra.rotation.x = 20;
  Tetra.rotation.z = -10;
  Tetra.position.x = x;
  Tetra.position.y = y;
  Tetra.position.z = obstacleZ;
  return Tetra;
}

let obstacleShapes = [];
const UserCube = createCube(0, 0, -1000);
const UserSphere = createSphere(0, 0, -1000);
const UserTetra = createTetra(0, 0, -1000, 0, 0);
const userShape = [
  { type: "cube", object: UserCube },
  { type: "sphere", object: UserSphere },
  { type: "tetra", object: UserTetra }
];
let index = Math.floor(Math.random() * Math.floor(3));
const UserRandomShape = userShape[index];
scene.add(UserRandomShape.object);

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 37) {
    UserRandomShape.object.position.x -= 100;
    if (UserRandomShape.object.position.x <= -100) {
      UserRandomShape.object.position.x = -100;
    }
  } else if (keyCode == 39) {
    UserRandomShape.object.position.x += 100;
    if (UserRandomShape.object.position.x >= 100) {
      UserRandomShape.object.position.x = 100;
    }
  }
}
function animate() {
  requestAnimationFrame(animate);
  obstacleShapes.forEach(obstacleObject => {
    obstacleObject.object.position.y -= 1;
  });

  renderer.render(scene, camera);
  gameOver(UserRandomShape, obstacleShapes);
  obstacleShapes = clearPassedShapes(obstacleShapes);
}

delay();
animate();

function gameOver(UserRandomShape, obstacleShapes) {
  obstacleShapes.forEach(obstacleObject => {
    if (
      UserRandomShape.object.position.x !== obstacleObject.object.position.x &&
      obstacleObject.object.position.y === UserRandomShape.object.position.y &&
      obstacleObject.type === UserRandomShape.type
    ) {
      document.querySelector("div").classList.remove("hidden");
    }
  });
}

function clearPassedShapes(obstacleShapes) {
  return obstacleShapes
    .map(obstacleObject => {
      if (obstacleObject.object.position.y <= -200) {
        scene.remove(obstacleObject.object);
        return undefined;
      } else {
        return obstacleObject;
      }
    })
    .filter(obstacleObject => obstacleObject !== undefined);
}

var shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
function delay() {
  setTimeout(() => {
    const xCoordinate = [0, 100, -100];
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
    delay();
  }, 3000);
}
