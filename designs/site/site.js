// Key Web Design — shared behavior (loaded with defer on every designs/site page).
// The html.js class gate stays inline in each <head>; it must run before first paint.

// Scroll reveals — guarded so content is never stuck hidden.
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) {
      const el = e.target;
      el.classList.add('in');
      el.addEventListener('transitionend', () => el.classList.remove('reveal', 'in'), { once: true });
      io.unobserve(el);
    }
  }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// Mobile menu sugar — <details> works without any of this.
const mnav = document.querySelector('.mnav');
if (mnav) {
  mnav.addEventListener('click', e => { if (e.target.closest('a')) mnav.removeAttribute('open'); });
  document.addEventListener('click', e => { if (!mnav.contains(e.target)) mnav.removeAttribute('open'); });
}

// Contact form — fetch submit with inline states; without JS the form
// does a plain POST to Formspree, which is fully functional.
const form = document.querySelector('form[data-contact]');
if (form) {
  form.setAttribute('novalidate', '');
  const status = document.getElementById('form-status');
  const setErr = (el, on) => { const f = el.closest('.field'); if (f) f.classList.toggle('error', on); };

  form.addEventListener('input', e => {
    if (e.target.closest('.field.error') && e.target.checkValidity()) setErr(e.target, false);
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let bad = false;
    for (const el of form.querySelectorAll('[required]')) {
      const ok = el.checkValidity();
      setErr(el, !ok);
      if (!ok) bad = true;
    }
    if (bad) { status.textContent = 'Please fix the highlighted fields.'; return; }
    status.textContent = '';
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      form.hidden = true;
      document.getElementById('form-ok').hidden = false;
    } catch {
      status.innerHTML = 'Something went wrong — email <a href="mailto:brigham@saptron.com">brigham@saptron.com</a> instead.';
      btn.disabled = false; btn.textContent = orig;
    }
  });
}
