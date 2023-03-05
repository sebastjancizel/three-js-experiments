import './style.css';

import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF63647, wireframe: false}); // color from firebase io tutorial
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 30;

const geo= new ParametricGeometry( ParametricGeometries.klein, 25, 25);
const mat = new THREE.MeshStandardMaterial( { color: 0xFF63647, wireframe:false } );
const klein = new THREE.Mesh( geo , mat );
scene.add( klein );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

//set backround color to #757575
scene.background = new THREE.Color(0x424242);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
//add axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;
  //change the disctance of the camera with scroll

  controls.update();

	renderer.render(scene, camera);
}

//add wheel event listener
document.addEventListener('wheel', (event) => {
  //check the direction of the scroll and update the camera position accordingly
  if (event.deltaY > 0) {
    camera.position.z += 1;
  } else {
    camera.position.z -= 1;
  }
});

animate();