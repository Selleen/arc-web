// src/p5/darkflowers2Sketch.js
export const darkflowers2Sketch = (p, container) => {
  let petals = [];
  let nbPetals = 42;
  let count = 0;

  // estas van a seguir el tamaño REAL del contenedor
  let w = 0;
  let h = 0;

  p.setup = () => {
    // medir el contenedor (y poner fallback por si viene 0)
    w = (container && container.offsetWidth) || p.windowWidth;
    h = (container && container.offsetHeight) || p.windowHeight;

    const canvas = p.createCanvas(w, h);
    canvas.style("display", "block");

    p.colorMode(p.HSB, 360, 1, 100);
    p.background(0, 0, 0);

    count = 0;
    setPetals();
  };

  p.windowResized = () => {
    // volver a medir el contenedor cuando cambie el tamaño
    w = (container && container.offsetWidth) || p.windowWidth;
    h = (container && container.offsetHeight) || p.windowHeight;

    p.resizeCanvas(w, h);
    setPetals();
  };

  function setPetals() {
    petals = [];
    for (let i = 1; i < nbPetals; i++) {
      const speed = i * 0.02;
      const petal = {
        root1: {
          x: 0.42 * w,
          y: 0.95 * h,
          angle: 180,
          leftrad: 0.2 * w,
          rightrad: 0.2 * w,
          speed,
        },
        root2: {
          x: 0.58 * w,
          y: 0.95 * h,
          angle: 180,
          leftrad: 0.2 * w,
          rightrad: 0.2 * w,
          speed,
        },
        canopy: {
          x: 0.5 * w,
          y: 0.01 * h,
          angle: 180,
          leftrad: 0.0 * w,
          rightrad: 0.0 * w,
          speed,
        },
        elbow1: {
          x: 0.5 * w,
          y: 0.75 * h,
          angle: 90,
          leftrad: 0 * w,
          rightrad: 0 * w,
          speed,
        },
        elbow2: {
          x: 0.5 * w,
          y: 0.75 * h,
          angle: 270,
          leftrad: 0 * w,
          rightrad: 0 * w,
          speed,
        },
        hu: 0,
        sa: 0,
        br: 100,
      };
      petals.push(petal);
    }
  }

  p.draw = () => {
    p.background(0, 0, 0);

    count++;

    flower2();

    if (count < 2000) {
      open();
    } else if (count < 4000) {
      close();
    } else if (count < 6000) {
      wide();
    } else if (count < 7000) {
      wider();
    } else {
      count = 0;
      setPetals();
    }
  };

  function open() {
    for (const petal of petals) {
      petal.elbow1.x -= petal.elbow1.speed;
      petal.elbow2.x += petal.elbow2.speed;
      petal.canopy.leftrad += petal.canopy.speed;
      petal.canopy.rightrad += petal.canopy.speed;
      petal.sa += 0.01;
    }
  }

  function close() {
    for (const petal of petals) {
      petal.elbow1.x += petal.elbow1.speed;
      petal.elbow2.x -= petal.elbow2.speed;
      petal.elbow1.y -= petal.elbow1.speed;
      petal.elbow2.y -= petal.elbow2.speed;
      petal.canopy.leftrad -= petal.canopy.speed;
      petal.canopy.rightrad -= petal.canopy.speed;
      petal.sa -= 0.01;
    }
  }

  function wide() {
    for (const petal of petals) {
      petal.elbow1.x += petal.elbow1.speed;
      petal.elbow2.x -= petal.elbow2.speed;
      petal.canopy.leftrad += petal.canopy.speed;
      petal.canopy.rightrad += petal.canopy.speed;
      petal.hu += 0.1;
      petal.sa += 0.01;
    }
  }

  function wider() {
    for (const petal of petals) {
      petal.elbow1.leftrad += petal.elbow1.speed;
      petal.elbow1.rightrad += petal.elbow1.speed;
      petal.elbow2.leftrad += petal.elbow2.speed;
      petal.elbow2.rightrad += petal.elbow2.speed;
      petal.elbow1.y += petal.elbow1.speed;
      petal.elbow2.y += petal.elbow2.speed;
    }
  }

  function flower2() {
    if (!petals || petals.length === 0) return;

    for (const petal of petals) {
      p.noFill();
      p.stroke(petal.hu, petal.sa, petal.br);
      p.strokeWeight(1);

      // 1) root1 → elbow1
      let controlsRoot1 = drawTangdark(
        petal.root1.x,
        petal.root1.y,
        petal.root1.angle,
        petal.root1.leftrad,
        petal.root1.rightrad
      );
      let controlsElbow1 = drawTangdark(
        petal.elbow1.x,
        petal.elbow1.y,
        petal.elbow1.angle,
        petal.elbow1.leftrad,
        petal.elbow1.rightrad
      );

      p.bezier(
        petal.root1.x,
        petal.root1.y,
        controlsRoot1[2],
        controlsRoot1[3],
        controlsElbow1[0],
        controlsElbow1[1],
        petal.elbow1.x,
        petal.elbow1.y
      );

      // 2) elbow1 → canopy
      let controlsCanopy = drawTangdark(
        petal.canopy.x,
        petal.canopy.y,
        petal.canopy.angle,
        petal.canopy.leftrad,
        petal.canopy.rightrad
      );

      p.bezier(
        petal.elbow1.x,
        petal.elbow1.y,
        controlsElbow1[2],
        controlsElbow1[3],
        controlsCanopy[2],
        controlsCanopy[3],
        petal.canopy.x,
        petal.canopy.y
      );

      // 3) canopy → elbow2
      let controlsElbow2 = drawTangdark(
        petal.elbow2.x,
        petal.elbow2.y,
        petal.elbow2.angle,
        petal.elbow2.leftrad,
        petal.elbow2.rightrad
      );

      p.bezier(
        petal.canopy.x,
        petal.canopy.y,
        controlsCanopy[0],
        controlsCanopy[1],
        controlsElbow2[0],
        controlsElbow2[1],
        petal.elbow2.x,
        petal.elbow2.y
      );

      // 4) elbow2 → root2
      let controlsRoot2 = drawTangdark(
        petal.root2.x,
        petal.root2.y,
        petal.root2.angle,
        petal.root2.leftrad,
        petal.root2.rightrad
      );

      p.bezier(
        petal.elbow2.x,
        petal.elbow2.y,
        controlsElbow2[2],
        controlsElbow2[3],
        controlsRoot2[0],
        controlsRoot2[1],
        petal.root2.x,
        petal.root2.y
      );
    }
  }

  function drawTangdark(cx, cy, angle, radleft, radright) {
    const ang = angle;
    const dx1 = cx + radleft * p.cos(p.radians(ang));
    const dy1 = cy + radleft * p.sin(p.radians(ang));
    const dx2 = cx + radright * p.cos(p.radians(ang + 180));
    const dy2 = cy + radright * p.sin(p.radians(ang + 180));

    return [
      Number.isFinite(dx1) ? dx1 : cx,
      Number.isFinite(dy1) ? dy1 : cy,
      Number.isFinite(dx2) ? dx2 : cx,
      Number.isFinite(dy2) ? dy2 : cy,
    ];
  }
};
