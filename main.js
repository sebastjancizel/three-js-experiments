import './style.css';

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF63647, wireframe: false}); // color from firebase io tutorial
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 30;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

//set backround color to #757575
scene.background = new THREE.Color(0x424242);

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
  //change the disctance of the camera with scroll

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