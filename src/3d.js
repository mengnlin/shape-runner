import * as THREE from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf8f3e9);
document.body.appendChild(renderer.domElement);

function createCube(x, y, z) {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  return cube;
}
// create CUBE
const obstacleCube1 = createCube(0, 600, -2200);
scene.add(obstacleCube1);

// create Sphere

function createSphere(x, y, z) {
  const geometry2 = new THREE.SphereGeometry(25);
  const material2 = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const sphere = new THREE.Mesh(geometry2, material2);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;
  return sphere;
}
const obstacleSphere1 = createSphere(100, 600, -2200);
scene.add(obstacleSphere1);

// create Triangle
function createTriangle(x, y, z, rx, rz) {
  const geometry3 = new THREE.TetrahedronGeometry(45);
  const material3 = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const triangle = new THREE.Mesh(geometry3, material3);
  triangle.rotation.x = 20;
  triangle.rotation.z = -10;
  triangle.position.x = x;
  triangle.position.y = y;
  triangle.position.z = z;
  return triangle;
}
const obstacleTriangle1 = createTriangle(-100, 600, -2200, 20, -10);
scene.add(obstacleTriangle1);

const obstacleShapes = [obstacleCube1, obstacleSphere1, obstacleTriangle1];
// create User Object
const UserCube = createCube(0, 0, -2200);
const UserSphere = createSphere(0, 0, -2200);
const UserTriangle = createTriangle(0, 0, -2200, 0, 0);
const userShape = [UserCube, UserSphere, UserTriangle];
let index = Math.floor(Math.random() * Math.floor(3));
const UserRandomShape = userShape[index];
scene.add(UserRandomShape);

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  // console.log("keydown", event.which);
  var keyCode = event.which;
  if (keyCode == 37) {
    UserRandomShape.position.x -= 100;
    if (UserRandomShape.position.x <= -100) {
      UserRandomShape.position.x = -100;
    }
  } else if (keyCode == 39) {
    UserRandomShape.position.x += 100;
    if (UserRandomShape.position.x >= 100) {
      UserRandomShape.position.x = 100;
    }
  }
}
function animate() {
  requestAnimationFrame(animate);
  obstacleSphere1.position.y -= 1;
  obstacleTriangle1.position.y -= 1;
  obstacleCube1.position.y -= 1;

  renderer.render(scene, camera);
  gameOver(
    UserRandomShape.position.x,
    UserRandomShape.position.y,
    obstacleShapes[index].position.x,
    obstacleShapes[index].position.y
  );
}
animate();

function gameOver(
  UserRandomShapePositionX,
  UserRandomShapePositionY,
  obstacleShapesX,
  obstacleShapesY
) {
  if (
    UserRandomShapePositionX !== obstacleShapesX &&
    obstacleShapesY === UserRandomShapePositionY
  ) {
    document.querySelector("div").classList.remove("hidden");
  }
}
