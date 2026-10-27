(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = { mx: 0, my: 0, p: 0 };

  document.querySelectorAll('.split').forEach(function (el) {
    var out = '';
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (t) {
          out += /^\s+$/.test(t) || !t ? t : '<span class="w"><span>' + t + '</span></span>';
        });
      } else if (n.nodeName === 'BR') out += '<br>';
      else out += '<span class="w"><span>' + n.outerHTML + '</span></span>';
    });
    el.innerHTML = out;
  });

  /* ---------- Three.js: orbiting skill network ---------- */
  try {
    var canvas = document.getElementById('bg');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 11;

    var group = new THREE.Group(); scene.add(group);
    var core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 3),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: .8, roughness: .25, flatShading: true, emissive: 0x053a46 })
    );
    group.add(core);
    var shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.3, 1), new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: .25 }));
    group.add(shell);

    var nodes = [], N = 46, geo = new THREE.SphereGeometry(.09, 12, 12);
    for (var i = 0; i < N; i++) {
      var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: i % 3 ? 0x7c5cff : 0x34d399 }));
      var r = 3.2 + Math.random() * 4, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      m.userData = { r: r, th: th, ph: ph, s: (Math.random() * .3 + .1) * (Math.random() > .5 ? 1 : -1) };
      group.add(m); nodes.push(m);
    }
    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * N * 6), 3));
    var lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: .22 }));
    group.add(lines);

    var sp = new Float32Array(1800 * 3);
    for (var j = 0; j < sp.length; j++) sp[j] = (Math.random() - .5) * 60;
    var sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    var stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0x9fe9f5, size: .05, transparent: true, opacity: .7 }));
    scene.add(stars);

    var l1 = new THREE.PointLight(0x22d3ee, 70, 40); l1.position.set(5, 4, 6);
    var l2 = new THREE.PointLight(0x7c5cff, 70, 40); l2.position.set(-6, -3, 5);
    scene.add(l1, l2, new THREE.AmbientLight(0x405060, 1.2));

    var resize = function () {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.position.z = innerWidth < 700 ? 15 : 11;
      camera.updateProjectionMatrix();
    };
    addEventListener('resize', resize); resize();

    var clock = new THREE.Clock(), arr = lineGeo.attributes.position.array;
    var loop = function () {
      var t = clock.getElapsedTime(), k = reduce ? 0 : 1, c = 0;
      nodes.forEach(function (n) {
        var u = n.userData, a = u.th + t * u.s * k;
        n.position.set(u.r * Math.sin(u.ph) * Math.cos(a), u.r * Math.cos(u.ph), u.r * Math.sin(u.ph) * Math.sin(a));
      });
      for (var a1 = 0; a1 < N; a1++) for (var b1 = a1 + 1; b1 < N; b1++) {
        if (nodes[a1].position.distanceTo(nodes[b1].position) < 2.6) {
          var p = nodes[a1].position, q = nodes[b1].position;
          arr[c++] = p.x; arr[c++] = p.y; arr[c++] = p.z; arr[c++] = q.x; arr[c++] = q.y; arr[c++] = q.z;
        }
      }
      lineGeo.setDrawRange(0, c / 3); lineGeo.attributes.position.needsUpdate = true;
      core.rotation.y = t * .3 * k; core.rotation.x = t * .15 * k;
      shell.rotation.y = -t * .12 * k; shell.rotation.z = t * .08 * k;
      core.scale.setScalar(1 + Math.sin(t * 1.5) * .03 * k);
      group.rotation.y = state.mx * .5 + state.p * 3;
      group.rotation.x = state.my * .3;
      stars.rotation.y = t * .01 * k;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };
    loop();
    window.__group = group;
  } catch (e) { document.getElementById('bg').style.display = 'none'; }

  addEventListener('pointermove', function (e) {
    state.mx = e.clientX / innerWidth * 2 - 1;
    state.my = e.clientY / innerHeight * 2 - 1;
  });

  var loader = document.getElementById('loader');
  var hide = function () { loader.classList.add('done'); intro(); };
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 1500); })]).then(function () { setTimeout(hide, 400); });
  else setTimeout(hide, 700);

  function intro() {
    if (!window.gsap || reduce) {
      document.querySelectorAll('.split .w>span').forEach(function (s) { s.style.transform = 'none'; });
      document.querySelectorAll('.skill').forEach(function (s) { s.classList.add('in'); });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero .split .w>span', { yPercent: 115, rotate: 6, duration: 1.2, ease: 'expo.out', stagger: .1 });
    gsap.from('.hero .reveal', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: .12, delay: .4 });
    document.querySelectorAll('.sec .split').forEach(function (h) {
      gsap.from(h.querySelectorAll('.w>span'), { yPercent: 115, rotate: 5, duration: 1, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    gsap.utils.toArray('.sec .reveal').forEach(function (el) {
      gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.set('.skill, .work', { opacity: 0 });
    ScrollTrigger.batch('.skill, .work', {
      start: 'top 90%',
      onEnter: function (b) {
        gsap.fromTo(b, { y: 80, opacity: 0, rotateX: -10 }, { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'expo.out', stagger: .12, overwrite: true });
        b.forEach(function (el) { el.classList.add('in'); });
      }
    });
    gsap.to('.hero h1', { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) {
      state.p = s.progress;
      document.getElementById('progress').style.transform = 'scaleX(' + s.progress + ')';
    } });
    if (window.__group) {
      var tl = gsap.timeline({ scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1 } });
      tl.to(window.__group.position, { x: innerWidth > 800 ? 3.4 : 0, duration: 1 })
        .to(window.__group.position, { x: innerWidth > 800 ? -3.4 : 0, duration: 1 })
        .to(window.__group.scale, { x: .7, y: .7, z: .7, duration: 1 }, '<')
        .to(window.__group.position, { x: 0, duration: 1 })
        .to(window.__group.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 1 }, '<');
    }
  }

  document.querySelectorAll('.tilt').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
      if (!reduce && window.gsap) gsap.to(el, { rotateY: (x - .5) * 10, rotateX: (.5 - y) * 10, transformPerspective: 900, duration: .4, overwrite: 'auto' });
    });
    el.addEventListener('pointerleave', function () { if (window.gsap) gsap.to(el, { rotateX: 0, rotateY: 0, duration: .6 }); });
  });
  document.querySelectorAll('.magnetic').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      if (window.gsap) gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .4, duration: .3 });
    });
    b.addEventListener('pointerleave', function () { if (window.gsap) gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }); });
  });
})();
