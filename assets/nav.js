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

/* Force the "Funding" label for the sponsors link on every page */
document.addEventListener('DOMContentLoaded', function () {
  var toKey = function (s) { return (s || '').trim().toLowerCase(); };

  var relabel = function (root) {
    var links = root.querySelectorAll('a[href$="sponsors.html"], a[href$="/sponsors.html"]');
    links.forEach(function (a) {
      // Update visible text while keeping any icons
      var hadTextNode = false;
      a.childNodes.forEach(function (n) {
        if (n.nodeType === 3) {
          hadTextNode = true;
          if (toKey(n.nodeValue) !== 'funding') n.nodeValue = 'Funding';
        }
      });
      if (!hadTextNode && toKey(a.textContent) === 'sponsors') {
        // Safe fallback if the link has only text
        a.textContent = 'Funding';
      }

      // Accessibility and tooltip
      if (toKey(a.getAttribute('aria-label')) !== 'funding') {
        a.setAttribute('aria-label', 'Funding');
      }
      if (toKey(a.getAttribute('title')) !== 'funding') {
        a.setAttribute('title', 'Funding');
      }
    });
  };

  // Initial pass
  relabel(document);

  // Catch late inserts
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1) relabel(n);
      });
    });
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
});
