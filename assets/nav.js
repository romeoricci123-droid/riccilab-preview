/* assets/nav.js */
(function () {
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  var mq = window.matchMedia('(min-width: 761px)');
  if (mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      if (e.matches) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  } else if (mq.addListener) {
    mq.addListener(function (e) {
      if (e.matches) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
// Rename "Sponsors" → "Funding" in all navs after render
document.addEventListener('DOMContentLoaded', () => {
  const renameNavLabels = () => {
    const candidates = document.querySelectorAll('nav a, nav button, nav span, nav li');
    candidates.forEach(el => {
      const t = el.textContent && el.textContent.trim();
      if (t === 'Sponsors') {
        el.textContent = 'Funding';
      }
      if (el.getAttribute && el.getAttribute('aria-label') === 'Sponsors') {
        el.setAttribute('aria-label', 'Funding');
      }
      if (el.title === 'Sponsors') {
        el.title = 'Funding';
      }
    });
  };
  renameNavLabels();
});
