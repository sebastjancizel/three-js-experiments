import * as THREE from 'three';
import * as d3 from 'd3';
import { create, all, concat } from 'mathjs';

const math = create(all, {});

let CY = function(n, a){
  function coordinate(x, y, n, k1, k2, a) {
    const z1 = math.multiply(
      math.exp(math.complex(0, (2 * math.pi * k1) / n)),
      math.pow(math.cos(math.complex(x, y)), 2 / n)
    );
    const z2 = math.multiply(
      math.exp(math.complex(0, (2 * math.pi * k2) / n)),
      math.pow(math.sin(math.complex(x, y)), 2 / n)
    );
    return [
      z1.re,
      z2.re,
      z1.im * math.cos(a) + z2.im * math.sin(a)
    ];
  }

  const dx = math.pi/10;
  const dy = math.pi/10;

  let points = [];
  d3.cross(d3.range(n), d3.range(n)).forEach(k => {
    d3.range(0, math.pi/2, dx).forEach(x => {
        d3.range(-math.pi/2, math.pi/2, dy).forEach(y => {
          points = concat(points, coordinate(x, y, n, k[0], k[1], a));
        });
    });
  });
  return Float32Array.from(points);
};

export default CY;