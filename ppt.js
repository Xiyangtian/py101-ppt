/* =========================================================
   课堂网页PPT · ppt.js
   轻量演示引擎：<section class="slide"> 是全屏页，
   用底部按钮 / 键盘 ←→ 空格 翻页。
   ========================================================= */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var cur = 0;
  var curEl = document.getElementById('cur');
  var totEl = document.getElementById('total');
  var barEl = document.getElementById('bar');

  function update() {
    document.querySelectorAll('.slide').forEach(function (s, i) {
      s.classList.toggle('active', i === cur);
    });
    if (curEl) curEl.textContent = cur + 1;
    if (totEl) totEl.textContent = slides.length;
    if (barEl) barEl.style.width = ((cur + 1) / slides.length * 100) + '%';
  }
  function next() { if (cur < slides.length - 1) { cur++; update(); } }
  function prev() { if (cur > 0) { cur--; update(); } }

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  window.nextSlide = next;
  window.prevSlide = prev;

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault(); next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault(); prev();
    } else if (e.key === 'Home') { cur = 0; update(); }
    else if (e.key === 'End') { cur = slides.length - 1; update(); }
  });

  update();

  // 复制代码按钮
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var codeEl = btn.closest('.code');
      var text = '';
      if (codeEl) {
        var clone = codeEl.cloneNode(true);
        var act = clone.querySelector('.code-actions');
        var bar = clone.querySelector('.bar');
        if (act) act.parentNode.removeChild(act);
        if (bar) bar.parentNode.removeChild(bar);
        text = clone.textContent.trim();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = '✓ 已复制';
          setTimeout(function () { btn.textContent = '📋 Copy'; }, 1400);
        });
      }
    });
  });
})();
