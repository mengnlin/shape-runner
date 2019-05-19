import * as THREE from "three";

const obstacleY = 600;
const obstacleZ = -1000;

export function createCube(x, y = obstacleY) {
  const geometry = new THREE.BoxGeometry(25, 25, 25);
  const material = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = obstacleZ;
  return cube;
}

export function createSphere(x, y = obstacleY) {
  const geometry2 = new THREE.SphereGeometry(15);
  const material2 = new THREE.MeshLambertMaterial({ color: 0xef5462 });
  const sphere = new THREE.Mesh(geometry2, material2);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = obstacleZ;
  return sphere;
}

export function createTetra(x, y = obstacleY) {
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
