import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// key particle settings here
const SEPARATION = 200, AMOUNTX = 50, AMOUNTY = 50;

let container, stats;
let camera, scene, renderer;

let particles, count = 0;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth;
let windowHalfY = window.innerHeight;

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);
  //make the container fill the right half of the screen


  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.x = 3000;
  camera.position.y = 200;
  camera.position.z = 3000;

  scene = new THREE.Scene();
  // set background color to dark grey
  scene.background = new THREE.Color(0x111111);

  const numParticles = AMOUNTX * AMOUNTY;

  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0, j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {

    for (let iy = 0; iy < AMOUNTY; iy++) {

      positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z

      scales[j] = 15;

      i += 3;
      j++;

    }
  }


  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({

    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
    },
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent

  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  container.style.touchAction = 'none';
  container.addEventListener('pointermove', onPointerMove);

  window.addEventListener('resize', onWindowResize);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;

  // add axis helper
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
  // add text
}
function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onPointerMove(event) {

  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onScroll(event) {

  camera.position.z += event.deltaY * 0.05;

}


function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {

  const positions = particles.geometry.attributes.position.array;
  const scales = particles.geometry.attributes.scale.array;

  let i = 0, j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {

    for (let iy = 0; iy < AMOUNTY; iy++) {

      positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) +
        (Math.cos((iy + count) * 0.5) * 50)

      i += 3;
      j++;

    }

  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render(scene, camera);

  count += 0.05;

}
