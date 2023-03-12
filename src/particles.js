import * as THREE from 'three';


//define a particles class with a constructor and update method
class ParticlePlane {
	constructor(amount_x, amount_y, separation) {
		this.amount_x = amount_x;
		this.amount_y = amount_y;
		this.separation = separation;
		this.num_particles = this.amount_x * this.amount_y;
		this.positions = new Float32Array(this.num_particles * 3);
		this.scales = new Float32Array(this.num_particles);

		let i = 0, j = 0;

		for (let ix = 0; ix < this.amount_x; ix++) {

			for (let iy = 0; iy < this.amount_y; iy++) {

				this.positions[i] = ix * this.separation - ((this.amount_x * this.separation) / 2); // x
				this.positions[i + 1] = 0; // y
				this.positions[i + 2] = iy * this.separation - ((this.amount_y * this.separation) / 2); // z

				this.scales[j] = 20;

				i += 3;
				j++;

			}
		}

		this.geometry = new THREE.BufferGeometry();
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				color: { value: new THREE.Color(0xffffff) },
			},
			vertexShader: document.getElementById('vertexshader').textContent,
			fragmentShader: document.getElementById('fragmentshader').textContent

		});

		this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
		this.geometry.setAttribute('scale', new THREE.BufferAttribute(this.scales, 1));

		this.particles = new THREE.Points(this.geometry, this.material);
	}

	update(count, rotateY=0.0005) {

		let positions = this.particles.geometry.attributes.position.array;

		let i = 0, j = 0;

		for (let ix = 0; ix < this.amount_x; ix++) {

			for (let iy = 0; iy < this.amount_y; iy++) {

				positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) +
					(Math.cos((iy + count) * 0.5) * 50)

				i += 3;
				j++;

			}
		}

		this.particles.geometry.attributes.position.needsUpdate = true;
		this.particles.rotateY(rotateY);

	}
}


export default ParticlePlane;
