import * as THREE from 'three';
import * as d3 from 'd3';
import { create, all, concat } from 'mathjs';

const math = create(all, {});

// Make a list of plane meshes for Calabi-Yau Manifold
let calabiYau = function(n, a) {
  function coordinate(x, y, n, k1, k2, a) {
      const z1 = math.multiply(
          math.exp(math.complex(0, 2*math.pi*k1/n)),
          math.pow(math.cos(math.complex(x, y)), 2/n)
      );
      const z2 = math.multiply(
          math.exp(math.complex(0, 2*math.pi*k2/n)),
          math.pow(math.sin(math.complex(x, y)), 2/n)
      );
      return new THREE.Vector3(z1.re, z2.re, z1.im*math.cos(a) + z2.im*math.sin(a));
  }

  const dx = math.pi/25;
  const dy = math.pi/25;
  const meshes = [];
  d3.cross(d3.range(n), d3.range(n)).forEach(k => {
      d3.range(0, math.pi/2, dx).forEach(x => {
          d3.range(-math.pi/2, math.pi/2, dy).forEach(y => {
            const data = [
                {"x": x,    "y": y   },
                {"x": x+dx, "y": y   },
                {"x": x+dx, "y": y+dy},
                {"x": x,    "y": y+dy},
            ];
            meshes.push(normalRect(
                ...data.map(d => coordinate(d.x, d.y, n, k[0], k[1], a))
            ));
          });
      });
  });
  return meshes;
};

let normalRect = function(v1, v2, v3, v4) {
  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints([v1, v2, v3, v4]);

  const indices = [
      0, 1, 2,
      2, 3, 0,
  ]
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshNormalMaterial({wireframe: true});
  const plane = new THREE.Mesh(geometry, material);

  return plane;
}

const meshes = calabiYau(5, 2);
const mesh = new THREE.Group();
meshes.forEach(m => mesh.add(m));
//scale the mesh by a factor of 10
mesh.scale.set(100, 100, 100);

export default mesh;
