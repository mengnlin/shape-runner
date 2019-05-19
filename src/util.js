import * as THREE from "three";

const sceneWidth = window.innerWidth / 2;
const sceneHeight = window.innerHeight;
const laneInterval = 100;
export function createScene() {
  const scene = new THREE.Scene();
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);
  const light1 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light1);
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
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sceneWidth, sceneHeight);
  renderer.setClearColor(0xf8f3e9);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  return renderer;
}

function createBackgroundCube(x) {
  const geometry = new THREE.BoxGeometry(50, 1800, 5);
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = 0;
  cube.position.z = -1025;
  return cube;
}
