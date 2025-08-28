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
