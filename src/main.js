import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import ParticlePlane from './particles';

// key particle settings here
const SEPARATION = 200,
  AMOUNTX = 100,
  AMOUNTY = 100;
const MAX_CAMERA_Y = 200;

let container;
let camera, scene, renderer;

let plane,
  step = 0;

let mouseX = 0,
  mouseY = 0;

let windowHalfX = window.innerWidth;
let windowHalfY = window.innerHeight;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    8000
  );
  camera.position.x = 3000;
  camera.position.y = MAX_CAMERA_Y;
  camera.position.z = 3000;

  // SCENE
  scene = new THREE.Scene();
  // set background color to dark grey
  scene.background = new THREE.Color(0x111111);

  plane = new ParticlePlane(AMOUNTX, AMOUNTY, SEPARATION);
  scene.add(plane.particles);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  container.style.touchAction = 'none';
  container.addEventListener('pointermove', onPointerMove);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('wheel', onScroll);

  // add axis helper
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  camera.lookAt(0, 0, 0);
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onScroll(event) {
  camera.position.y = MAX_CAMERA_Y - scrollY;
  camera.position.y = Math.min(camera.position.y, MAX_CAMERA_Y);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  plane.update(step);
  renderer.render(scene, camera);

  step += 0.05;
  camera.lookAt(0, camera.position.y, 0);
}
