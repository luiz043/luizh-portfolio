/* Hero canvas: oscilloscope line field.
   Motivation: the site itself is the creative-dev demo.
   Reduced motion: draws a single static frame. */
export function initHeroCanvas() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, t = 0, raf = null, running = false;
  var mouse = { x: -9999, y: -9999 };
  var ROWS = 14, STEP = 8;

  function resize() {
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    var top = h * 0.12, bottom = h * 0.66;
    var gap = (bottom - top) / (ROWS - 1);

    for (var r = 0; r < ROWS; r++) {
      var baseY = top + r * gap;
      var rowPhase = r * 0.55;
      var nearMouse = Math.abs(mouse.y - baseY) < gap * 1.2;

      ctx.beginPath();
      for (var x = 0; x <= w; x += STEP) {
        var env = Math.exp(-Math.pow((x - w * 0.55) / (w * 0.28), 2));
        var y = baseY
          + Math.sin(x * 0.008 + t * 0.9 + rowPhase) * 16 * env
          + Math.sin(x * 0.021 - t * 0.6 + rowPhase * 1.7) * 9 * env;

        var dx = x - mouse.x, dy = baseY - mouse.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 32400) { // 180px radius
          y -= (1 - Math.sqrt(d2) / 180) * 26;
        }
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = nearMouse
        ? 'rgba(200, 240, 76, 0.55)'
        : 'rgba(237, 239, 230, ' + (0.05 + 0.05 * (r / ROWS)) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function loop() {
    t += 0.016;
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!running && !reduceMotion) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

  resize();
  window.addEventListener('resize', function () { resize(); if (reduceMotion) draw(); });

  if (finePointer && !reduceMotion) {
    canvas.parentElement.addEventListener('pointermove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('pointerleave', function () {
      mouse.x = -9999; mouse.y = -9999;
    });
  }

  if (reduceMotion) { t = 4; draw(); return; }

  var io = new IntersectionObserver(function (entries) {
    entries[0].isIntersecting ? start() : stop();
  }, { threshold: 0.05 });
  io.observe(canvas.parentElement);

  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });
}
