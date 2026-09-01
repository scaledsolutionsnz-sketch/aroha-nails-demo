/* Aroha Nails and Reflexology, Te Aroha */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- opening animation ---- */
  function closeIntro() {
    document.body.classList.add('intro-done');
    window.setTimeout(function () {
      var i = document.getElementById('intro');
      if (i && i.parentNode) { i.parentNode.removeChild(i); }
    }, 900);
  }
  window.setTimeout(closeIntro, reduced ? 200 : 1500);

  /* ---- year ---- */
  var y = document.getElementById('year');
  if (y) { y.textContent = String(new Date().getFullYear()); }

  /* ---- gmail compose links (built in JS, address never in the HTML) ---- */
  document.querySelectorAll('a[data-gmail]').forEach(function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
             '&su=' + (a.getAttribute('data-su') || '') +
             '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
    if (a.hasAttribute('data-label')) { a.textContent = to; }
  });

  /* ---- nav state ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) { return; }
    if (window.scrollY > 40) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    if (burger) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });
  }
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); }
  });

  /* ---- hero slide rotation ---- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1 && !reduced) {
    var s = 0;
    window.setInterval(function () {
      slides[s].classList.remove('active');
      s = (s + 1) % slides.length;
      slides[s].classList.add('active');
    }, 5600);
  }

  /* ---- hero review quotes (same wording as the cards below) ---- */
  var QUOTES = [
    { text: 'Just had a Reflexology treatment and it was amazing. Highly recommended!', who: 'Tony Hodges' },
    { text: 'Love, love, love getting my nails done here! Fab nails and professionalism.', who: 'Sapphire Martin' },
    { text: 'I definitely walked out feeling like a new woman with brand new feet, beautiful massage too.', who: 'Michelle Vera' },
    { text: 'Just so relaxing!!', who: 'Ngaire Keightley' }
  ];
  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>';
  var box = document.getElementById('heroQuote');
  if (box) {
    var html = '';
    QUOTES.forEach(function (q, i) {
      html += '<div class="q' + (i === 0 ? ' active' : '') + '">' +
              '<div class="stars" aria-label="5 out of 5 stars">' + STAR + STAR + STAR + STAR + STAR + '</div>' +
              '<p>' + q.text + '</p>' +
              '<div class="who">' + q.who + '</div>' +
              '</div>';
    });
    html += '<span class="tag">Google reviews</span>';
    box.innerHTML = html;

    var qs = box.querySelectorAll('.q');
    if (qs.length > 1 && !reduced) {
      var qi = 0;
      window.setInterval(function () {
        qs[qi].classList.remove('active');
        qi = (qi + 1) % qs.length;
        qs[qi].classList.add('active');
      }, 6200);
    }
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 3, 2) * 90) + 'ms';
      io.observe(el);
    });
  }
})();
