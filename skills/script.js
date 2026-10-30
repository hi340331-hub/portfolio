/* Skills hero: an orbiting skill network that lives in the hero only, to the right of the headline. */
(function () {
  var canvas = document.getElementById('scene');
  if (!canvas || !window.THREE) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = { mx: 0, my: 0, visible: true };

  try {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 12;

    var group = new THREE.Group();
    scene.add(group);
    var core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 3),
      new THREE.MeshStandardMaterial({ color: 0x3fd5f0, metalness: 0.8, roughness: 0.25, flatShading: true, emissive: 0x053a46 })
    );
    group.add(core);
    var shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.4, 1),
      new THREE.MeshBasicMaterial({ color: 0x8b6cff, wireframe: true, transparent: true, opacity: 0.22 })
    );
    group.add(shell);

    var nodes = [], N = 46, geo = new THREE.SphereGeometry(0.09, 12, 12);
    for (var i = 0; i < N; i++) {
      var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: i % 3 ? 0x8b6cff : 0x46e3a8 }));
      m.userData = {
        r: 3.2 + Math.random() * 3.6,
        th: Math.random() * Math.PI * 2,
        ph: Math.acos(2 * Math.random() - 1),
        s: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      };
      nodes.push(m);
      group.add(m);
    }
    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * N * 6), 3));
    var lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x3fd5f0, transparent: true, opacity: 0.2 }));
    group.add(lines);

    var l1 = new THREE.PointLight(0x3fd5f0, 70, 40); l1.position.set(5, 4, 6);
    var l2 = new THREE.PointLight(0x8b6cff, 70, 40); l2.position.set(-6, -3, 5);
    scene.add(l1, l2, new THREE.AmbientLight(0x405060, 1.2));

    var resize = function () {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    addEventListener('resize', resize);
    resize();

    new IntersectionObserver(function (e) { state.visible = e[0].isIntersecting; }).observe(canvas);

    var clock = new THREE.Clock(), arr = lineGeo.attributes.position.array;
    var loop = function () {
      requestAnimationFrame(loop);
      if (!state.visible) return;
      var t = clock.getElapsedTime() * (reduce ? 0 : 1);
      nodes.forEach(function (n) {
        var u = n.userData, a = u.th + t * u.s;
        n.position.set(u.r * Math.sin(u.ph) * Math.cos(a), u.r * Math.cos(u.ph), u.r * Math.sin(u.ph) * Math.sin(a));
      });
      var c = 0;
      for (var a1 = 0; a1 < N; a1++) for (var b1 = a1 + 1; b1 < N; b1++) {
        if (nodes[a1].position.distanceTo(nodes[b1].position) < 2.6) {
          var p = nodes[a1].position, q = nodes[b1].position;
          arr[c++] = p.x; arr[c++] = p.y; arr[c++] = p.z; arr[c++] = q.x; arr[c++] = q.y; arr[c++] = q.z;
        }
      }
      lineGeo.setDrawRange(0, c / 3);
      lineGeo.attributes.position.needsUpdate = true;
      core.rotation.y = t * 0.3; core.rotation.x = t * 0.15;
      shell.rotation.y = -t * 0.12;
      group.rotation.y = state.mx * 0.4 + scrollY * 0.0008;
      group.rotation.x = state.my * 0.25;
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
