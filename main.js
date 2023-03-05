import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// initialize the fundamental three.js objects
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

const group = new THREE.Group();
scene.add(group);

// add a torus
let geometry = new THREE.TorusGeometry(10, 3, 16, 200);
geometry.deleteAttribute('normal');
geometry.deleteAttribute('uv');
geometry = BufferGeometryUtils.mergeVertices(geometry);

camera.position.x = 30;

// create a material for the points
const pointsMaterial = new THREE.PointsMaterial( { size: 0.1, color: 0xff6346, sizeAttenuation: true } );

// get vertices from the torus
const vertices = geometry.attributes.position;
const array = [];
// iterate through the vertices and add them to the array
for (let i = 0; i < vertices.count; i++) {
  const vertex = new THREE.Vector3();
  vertex.fromBufferAttribute(vertices, i);
  array.push(vertex);
}

// create a geometry for the points
const pointsGeometry = new THREE.BufferGeometry().setFromPoints(array);

// create the points
const points = new THREE.Points(pointsGeometry, pointsMaterial);
group.add(points);

const meshMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  opacity: 0.5,
  side: THREE.DoubleSide,
  transparent: true,
})

const meshGeometry = new THREE.BufferGeometry().setFromPoints(array);
const mesh = new THREE.Mesh( meshGeometry, meshMaterial );


//add light
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 20, 20);
// scene.add(pointLight)

// add helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function animate() {
	requestAnimationFrame(animate);

  //change the disctance of the camera with scroll

  controls.update();

  window.addEventListener('resize', onWindowResize,);

	renderer.render(scene, camera);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

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