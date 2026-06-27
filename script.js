/* ============================================================
   MARWAN ELFOULY — PORTFOLIO  |  Interactive JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Year ───────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Navbar scroll state ────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Hamburger menu ─────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
    });
  });

  // ── Typing animation ───────────────────────────────────────
  const typedEl  = document.getElementById('typed-text');
  const phrases  = ['Full Stack Developer', 'AI Engineer', 'Mobile Developer', 'Problem Solver'];
  let pIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const phrase = phrases[pIdx];
    typedEl.textContent = deleting ? phrase.slice(0, cIdx--) : phrase.slice(0, cIdx++);

    if (!deleting && cIdx > phrase.length) {
      setTimeout(() => { deleting = true; tick(); }, 1800);
      return;
    }
    if (deleting && cIdx < 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      cIdx = 0;
      setTimeout(tick, 350);
      return;
    }
    setTimeout(tick, deleting ? 45 : 75);
  }
  if (typedEl) tick();

  // ── Scroll animations (Intersection Observer) ──────────────
  const aosEls = document.querySelectorAll('[data-aos]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger sibling cards slightly
        const delay = entry.target.closest('.about-stats, .other-grid, .skills-grid')
          ? i * 70 : 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  aosEls.forEach(el => io.observe(el));

  // ── Active nav on scroll ───────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const updateActive = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // ── Contact form → mailto ──────────────────────────────────
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim() || 'Portfolio Contact';
    const message = document.getElementById('c-message').value.trim();

    const mailto = `mailto:marwan.mohamedelfouly@gmail.com`
      + `?subject=${encodeURIComponent(subject + ' — from ' + name)}`
      + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailto;

    status.textContent = '✓ Opening your email client…';
    status.className   = 'form-status ok';
    setTimeout(() => {
      form.reset();
      status.textContent = '';
      status.className   = 'form-status';
    }, 3500);
  });

});
