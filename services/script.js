/* Services hero: a glossy torus knot that lives in the hero only, to the right of the headline. */
(function () {
  var canvas = document.getElementById('scene');
  if (!canvas || !window.THREE) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = { mx: 0, my: 0, visible: true };

  try {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 11.5;

    var knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2, 0.6, 260, 40),
      new THREE.MeshStandardMaterial({ color: 0x8b6cff, metalness: 0.85, roughness: 0.18, emissive: 0x1c1060, emissiveIntensity: 0.5 })
    );
    scene.add(knot);
    var wire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.3, 0.7, 120, 16),
      new THREE.MeshBasicMaterial({ color: 0x3fd5f0, wireframe: true, transparent: true, opacity: 0.08 })
    );
    knot.add(wire);

    var N = 900, pos = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 6;
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xc9bfff, size: 0.04, transparent: true, opacity: 0.7 }));
    scene.add(stars);

    var l1 = new THREE.PointLight(0x3fd5f0, 70, 40); l1.position.set(6, 4, 6);
    var l2 = new THREE.PointLight(0xff5fa8, 70, 40); l2.position.set(-6, -3, 4);
    scene.add(l1, l2, new THREE.AmbientLight(0x404060, 1.1));

    var resize = function () {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    addEventListener('resize', resize);
    resize();

    new IntersectionObserver(function (e) { state.visible = e[0].isIntersecting; }).observe(canvas);

    var clock = new THREE.Clock();
    var loop = function () {
      requestAnimationFrame(loop);
      if (!state.visible) return;
      var t = clock.getElapsedTime() * (reduce ? 0 : 1);
      var scroll = Math.min(1, scrollY / innerHeight);
      knot.rotation.x = t * 0.15 + state.my * 0.3 + scroll * 1.2;
      knot.rotation.y = t * 0.2 + state.mx * 0.5;
      wire.rotation.y = -t * 0.1;
      stars.rotation.y = t * 0.01;
      knot.material.color.setHSL((0.71 + scroll * 0.25) % 1, 0.8, 0.62);
      camera.position.x += (state.mx * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (-state.my * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    loop();
  } catch (e) {
    canvas.style.display = 'none';
  }

  addEventListener('pointermove', function (e) {
    state.mx = (e.clientX / innerWidth) * 2 - 1;
    state.my = (e.clientY / innerHeight) * 2 - 1;
  });
})();
