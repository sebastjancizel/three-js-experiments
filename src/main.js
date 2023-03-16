import * as THREE from 'three';
import { gsap } from 'gsap';

import ParticlePlane from './particles';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import mesh from './calabiyau';
//import stats
import Stats from 'three/examples/jsm/libs/stats.module';

// key particle settings here
const SEPARATION = 200,
  AMOUNTX = 100,
  AMOUNTY = 100;
const MAX_CAMERA_Y = 300;

let container;
let camera, scene, renderer;
let controls;

let plane,
  step = 0;

const stats = Stats();
document.body.appendChild(stats.dom);

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
    10000
  );
  camera.position.x = 3000;
  camera.position.y = 0;
  camera.position.z = 0;

  // SCENE
  scene = new THREE.Scene();
  // set background color to dark grey
  scene.background = new THREE.Color(0x111111);

  plane = new ParticlePlane(AMOUNTX, AMOUNTY, SEPARATION);
  // scene.add(plane.particles);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  container.style.touchAction = 'none';
  window.addEventListener('resize', onWindowResize);

  // add orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = false;

  scene.add(mesh);
  //add point light
  const pointLight = new THREE.AmbientLight(0xffffff, 1);
  pointLight.position.set(0, 500, 0);
  scene.add(pointLight);

  camera.lookAt(0, 100, 0);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
  stats.update();
  requestAnimationFrame(animate);
  mesh.rotateX(0.005);
  mesh.rotateY(0.005);
  mesh.rotateZ(0.005);
  render();
}

function render() {
  // plane.update(step);
  renderer.render(scene, camera);
  controls.update();

  step += 0.05;
}
