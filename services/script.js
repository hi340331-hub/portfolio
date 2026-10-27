(function () {
  // Set your contact link here (Telegram, email, etc.)
  var CONTACT = ''; // e.g. 'https://t.me/yourname' or 'mailto:you@example.com'

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var link = document.getElementById('contactLink');
  if (CONTACT) link.href = CONTACT;

  /* Split headings into words for reveal */
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

  /* ---------- Three.js background ---------- */
  var state = { mx: 0, my: 0, p: 0 };
  var renderer, scene, camera, knot, halo, stars, ring;
  try {
    var canvas = document.getElementById('bg');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070b, 0.045);
    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 9;

    knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2, 0.55, 220, 32),
      new THREE.MeshStandardMaterial({ color: 0x7c5cff, metalness: 0.9, roughness: 0.2, emissive: 0x1a0f55, emissiveIntensity: 0.6 })
    );
    scene.add(knot);
    var wire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.25, 0.62, 120, 16),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.12 })
    );
    knot.add(wire);

    ring = new THREE.Mesh(new THREE.TorusGeometry(4, 0.01, 8, 200), new THREE.MeshBasicMaterial({ color: 0xff4fa3 }));
    ring.rotation.x = 1.2;
    scene.add(ring);

    var N = 2500, pos = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5;
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xbfb6ff, size: 0.05, transparent: true, opacity: 0.8 }));
    scene.add(stars);

    var l1 = new THREE.PointLight(0x22d3ee, 60, 40); l1.position.set(6, 4, 6);
    var l2 = new THREE.PointLight(0xff4fa3, 60, 40); l2.position.set(-6, -3, 4);
    scene.add(l1, l2, new THREE.AmbientLight(0x404060, 1.2));

    var resize = function () {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.position.z = innerWidth < 700 ? 12 : 9;
      camera.updateProjectionMatrix();
    };
    addEventListener('resize', resize); resize();

    var clock = new THREE.Clock();
    var loop = function () {
      var t = clock.getElapsedTime();
      var s = reduce ? 0 : 1;
      knot.rotation.x = t * 0.15 * s + state.p * 3;
      knot.rotation.y = t * 0.2 * s + state.mx * 0.6;
      knot.rotation.z = state.my * 0.3;
      wire.rotation.y = -t * 0.1 * s;
      ring.rotation.z = t * 0.2 * s;
      ring.rotation.y = state.p * 4;
      stars.rotation.y = t * 0.01 * s + state.p * 1.2;
      camera.position.x += (state.mx * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-state.my * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };
    loop();
  } catch (e) { document.getElementById('bg').style.display = 'none'; }

  addEventListener('pointermove', function (e) {
    state.mx = e.clientX / innerWidth * 2 - 1;
    state.my = e.clientY / innerHeight * 2 - 1;
    cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
  });
  var cursor = document.getElementById('cursor');
  document.querySelectorAll('a,.btn,.tilt').forEach(function (el) {
    el.addEventListener('pointerenter', function () { cursor.classList.add('big'); });
    el.addEventListener('pointerleave', function () { cursor.classList.remove('big'); });
  });

  /* ---------- Animations ---------- */
  var loader = document.getElementById('loader');
  var hide = function () { loader.classList.add('done'); intro(); };
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 1500); })]).then(function () { setTimeout(hide, 500); });
  else setTimeout(hide, 800);

  function intro() {
    if (!window.gsap || reduce) { document.querySelectorAll('.split .w>span').forEach(function (s) { s.style.transform = 'none'; }); return; }
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero .split .w>span', { yPercent: 115, rotate: 6, duration: 1.2, ease: 'expo.out', stagger: 0.09 });
    gsap.from('.hero .reveal', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.5 });

    document.querySelectorAll('.sec .split').forEach(function (h) {
      gsap.from(h.querySelectorAll('.w>span'), { yPercent: 115, rotate: 5, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    gsap.utils.toArray('.sec .reveal').forEach(function (el) {
      gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    ScrollTrigger.batch('.card, .perk, .callout', {
      start: 'top 90%',
      onEnter: function (b) { gsap.fromTo(b, { y: 70, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .9, ease: 'power3.out', stagger: .1, overwrite: true }); }
    });
    gsap.set('.card, .perk, .callout', { opacity: 0 });
    ScrollTrigger.batch('.plan', {
      start: 'top 90%',
      onEnter: function (b) { gsap.fromTo(b, { y: 90, opacity: 0, rotateX: -12 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: 'expo.out', stagger: .15, overwrite: true }); }
    });
    gsap.set('.plan', { opacity: 0 });

    var cnt = document.querySelector('[data-count]');
    if (cnt) ScrollTrigger.create({ trigger: cnt, start: 'top 90%', once: true, onEnter: function () {
      var o = { v: 0 }; gsap.to(o, { v: +cnt.dataset.count, duration: 1.6, ease: 'power2.out', onUpdate: function () { cnt.textContent = Math.round(o.v); } });
    } });

    gsap.to('.hero h1', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.steps li', { y: function (i) { return -20 * (i % 2 ? 1 : -1); }, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top bottom', end: 'bottom top', scrub: true } });

    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) {
      state.p = s.progress;
      document.getElementById('progress').style.transform = 'scaleX(' + s.progress + ')';
    } });

    /* knot travels with the page */
    if (knot) {
      var tl = gsap.timeline({ scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1 } });
      tl.to(knot.position, { x: innerWidth > 800 ? 3.2 : 0, y: 0.5, duration: 1 })
        .to(knot.position, { x: innerWidth > 800 ? -3.4 : 0, y: -0.5, duration: 1 })
        .to(knot.scale, { x: 1.35, y: 1.35, z: 1.35, duration: 1 }, '<')
        .to(knot.position, { x: innerWidth > 800 ? 3 : 0, y: 0, duration: 1 })
        .to(knot.scale, { x: .8, y: .8, z: .8, duration: 1 }, '<')
        .to(knot.position, { x: 0, y: 0, duration: 1 })
        .to(knot.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 1 }, '<');
      var col = { h: 0.7 };
      gsap.to(col, { h: 1.4, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true },
        onUpdate: function () { knot.material.color.setHSL(col.h % 1, .8, .6); knot.material.emissive.setHSL(col.h % 1, .8, .15); } });
    }
  }

  /* Tilt + spotlight */
  document.querySelectorAll('.tilt').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
      if (!reduce && window.gsap) gsap.to(el, { rotateY: (x - .5) * 10, rotateX: (.5 - y) * 10, transformPerspective: 900, duration: .4, overwrite: 'auto' });
    });
    el.addEventListener('pointerleave', function () { if (window.gsap) gsap.to(el, { rotateX: 0, rotateY: 0, duration: .6 }); });
  });

  /* Magnetic buttons */
  document.querySelectorAll('.magnetic').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      if (window.gsap) gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .4, duration: .3 });
    });
    b.addEventListener('pointerleave', function () { if (window.gsap) gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }); });
  });
})();
