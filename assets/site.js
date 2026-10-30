/* Shared behaviour for the portfolio hub, Services and Skills pages. */
(function () {
  // Fiverr profile link. Leave empty until the profile is ready: the Fiverr card then shows "Coming soon".
  var FIVERR = '';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (FIVERR) {
    document.querySelectorAll('[data-fiverr]').forEach(function (a) {
      a.href = FIVERR;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('aria-disabled');
      var label = a.querySelector('[data-fiverr-label]');
      if (label) label.textContent = 'Hire me on Fiverr';
    });
  }

  /* Info tooltip: hover/focus on desktop, tap to toggle on touch. */
  document.querySelectorAll('.info').forEach(function (info) {
    info.querySelector('.info-btn').addEventListener('click', function () { info.classList.toggle('open'); });
    document.addEventListener('click', function (e) { if (!info.contains(e.target)) info.classList.remove('open'); });
  });

  /* Split headings into masked words. */
  document.querySelectorAll('.split').forEach(function (el) {
    var i = 0, out = '';
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (t) {
          if (!t) return;
          out += /^\s+$/.test(t) ? ' ' : '<span class="w"><span style="--i:' + i++ + '">' + t + '</span></span>';
        });
      } else if (n.nodeName === 'BR') out += '<br>';
      else out += '<span class="w"><span style="--i:' + i++ + '">' + n.outerHTML + '</span></span>';
    });
    el.innerHTML = out;
  });

  /* Reveal on scroll. */
  var targets = document.querySelectorAll('[data-reveal], .split');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
  } else targets.forEach(function (t) { t.classList.add('in'); });

  /* Nav state + scroll progress. */
  var nav = document.querySelector('.nav');
  var bar = document.querySelector('.progress');
  var onScroll = function () {
    var y = scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (bar) {
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Card spotlight follows the pointer. */
  document.querySelectorAll('.card').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });

  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  /* Magnetic buttons. */
  document.querySelectorAll('.btn').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.22 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.3 + 'px)';
    });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });

  /* Cursor dot. */
  var cur = document.createElement('div');
  cur.className = 'cursor';
  document.body.appendChild(cur);
  addEventListener('pointermove', function (e) {
    cur.classList.add('on');
    cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
  });
  document.addEventListener('pointerleave', function () { cur.classList.remove('on'); });
  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('pointerenter', function () { cur.classList.add('big'); });
    el.addEventListener('pointerleave', function () { cur.classList.remove('big'); });
  });
})();
