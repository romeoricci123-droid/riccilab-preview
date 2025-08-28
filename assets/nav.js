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
// Rename "Sponsors" → "Funding" everywhere, including hamburger menu
document.addEventListener('DOMContentLoaded', () => {
  const toKey = s => (s || '').trim().toLowerCase();

  const replaceTextNodes = el => {
    el.childNodes.forEach(n => {
      if (n.nodeType === 3 && toKey(n.nodeValue) === 'sponsors') {
        n.nodeValue = 'Funding';
      }
    });
  };

  const renameIn = root => {
    const els = root.querySelectorAll('nav a, nav button, nav span, nav li, [aria-label], [title]');
    els.forEach(el => {
      const txt = (el.textContent || '').trim();
      // Change visible text but keep icons intact
      if (toKey(txt) === 'sponsors') replaceTextNodes(el);
      // Attributes
      const al = el.getAttribute && el.getAttribute('aria-label');
      if (toKey(al) === 'sponsors') el.setAttribute('aria-label', 'Funding');
      const title = el.getAttribute && el.getAttribute('title');
      if (toKey(title) === 'sponsors') el.setAttribute('title', 'Funding');
    });
  };

  // Initial pass
  renameIn(document);

  // Catch late inserts from the hamburger script
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      m.addedNodes.forEach(n => {
        if (n.nodeType === 1) renameIn(n);
      });
    });
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
});

