import * as THREE from "three";

const canvas = document.querySelector(".myCanvas");
const sceneWidth = parseInt(canvas.style.width, 10);
const sceneHeight = parseInt(canvas.style.height, 10);
const laneInterval = 100;
export function createScene() {
  const scene = new THREE.Scene();
  // const light = new THREE.PointLight(0xffffff, 1);
  // light.position.set(0, 0, 2000);
  // scene.add(light);
  scene.add(
    createBackgroundCube(-laneInterval),
    createBackgroundCube(0),
    createBackgroundCube(laneInterval)
  );

  return scene;
}

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    35,
    sceneWidth / sceneHeight,
    0.1,
    3000
  );
  camera.position.y = -700;
  camera.position.z = -500;
  camera.lookAt(new THREE.Vector3(0, 0, -1000));
  return camera;
}

export function createRenderer() {
  const myCanvas = document.querySelector(".myCanvas");

  const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
  });
  renderer.setSize(sceneWidth, sceneHeight);
  renderer.setClearColor(0xf8f3e9);
  // renderer.shadowMap.enabled = true;
  return renderer;
}

function createBackgroundCube(x) {
  const geometry = new THREE.BoxGeometry(50, 1800, 5);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = 0;
  cube.position.z = -1025;
  return cube;
}
