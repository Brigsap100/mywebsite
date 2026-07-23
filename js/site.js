/* Kodiak site — shared behavior: sticky header, mobile menu,
   scroll reveals, animated counters */
(function () {
  var hdr = document.querySelector('header.site');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('nav.main');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        // Section headings with panels: on mobile they toggle their accordion
        // instead of navigating/closing; placeholder "#" links never navigate.
        if (a.classList.contains('has-panel')) {
          var isMobile = window.matchMedia('(max-width:900px)').matches;
          if (isMobile || a.getAttribute('href') === '#') {
            ev.preventDefault();
            if (isMobile) {
              var ni = a.closest('.ni');
              if (ni) ni.classList.toggle('open');
            }
            return;
          }
        }
        nav.classList.remove('open');
      });
    });
  }

  // Active nav link — derived from the URL so headers stay copy-paste
  // identical across pages (no hand-placed `active` class needed).
  if (nav) {
    var here = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a.nl, .mega a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0];
      if (!href || href === '#') return;
      if (href === here) {
        a.classList.add('active');
        var ni = a.closest('.ni');
        var top = ni && ni.querySelector('a.nl');
        if (top) top.classList.add('active');
      }
    });
  }

  // CA/NV picker — the primary Contact CTA (.js-contact-cta) asks which
  // state the building is in before routing to the contact form.
  // Progressive enhancement: with no JS the CTA is a plain contact.html link.
  document.addEventListener('click', function (ev) {
    if (!ev.target || !ev.target.closest) return;
    var cta = ev.target.closest('.js-contact-cta');
    if (!cta) return;
    ev.preventDefault();
    if (document.querySelector('.picker-overlay')) return;
    var overlay = document.createElement('div');
    overlay.className = 'picker-overlay';
    overlay.innerHTML =
      '<div class="picker" role="dialog" aria-modal="true" aria-label="Choose your state">' +
      '<h3>Where is your building?</h3>' +
      '<p>We&#39;re licensed and crewed in both states — this routes your request to the right team.</p>' +
      '<div class="opts">' +
      '<a href="contact.html?region=ca"><b>California</b><span>CA #1119594 &middot; CA #732770</span></a>' +
      '<a href="contact.html?region=nv"><b>Nevada</b><span>NV #0042603</span></a>' +
      '</div>' +
      '<a class="alt" href="contact.html">Somewhere else / not sure</a>' +
      '</div>';
    var close = function () {
      overlay.classList.remove('show');
      setTimeout(function () { overlay.remove(); }, 250);
      document.removeEventListener('keydown', onKey);
    };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('show'); });
  });

  // contact.html region handling: ?region=ca|nv preselects the building
  // location and shows the matching license line. Safe no-op elsewhere.
  (function () {
    var regionSel = document.getElementById('region');
    if (!regionSel) return;
    var match = /[?&]region=(ca|nv)/.exec(location.search);
    if (match) regionSel.value = match[1] === 'ca' ? 'California' : 'Nevada';
  })();

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Animated counters (elements with data-count).
  // Progressive enhancement: the real final value is in the HTML, so with no
  // JS / no IntersectionObserver / reduced motion the number is still correct.
  // The count-up only starts (from 0) once the element is actually in view.
  var counters = document.querySelectorAll('[data-count]');
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor((0.5 - Math.cos(p * Math.PI) / 2) * target);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step); else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Lead intake — POST submissions to the CRM, then always show the
  // confirmation note (never block the user, even if the request fails).
  function val(id) { var el = document.getElementById(id); return el ? el.value : ''; }

  function submitLead(payload) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 4000);
    return fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).finally(function () { clearTimeout(timer); });
  }

  function wireLeadForm(formId, noteId, buildPayload) {
    var form = document.getElementById(formId);
    if (!form) return;
    var inFlight = false;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (inFlight) return; // ignore double submits (e.g. a second Enter press)
      inFlight = true;
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      var settle = function () {
        inFlight = false;
        if (btn) btn.disabled = false;
      };
      var done = function () {
        var note = document.getElementById(noteId);
        if (note) note.style.display = 'block';
        form.reset();
      };
      try {
        submitLead(buildPayload()).then(done, done).finally(settle);
      } catch (e) {
        done();
        settle();
      }
    });
  }

  // Contact form → CRM lead intake
  wireLeadForm('quoteForm', 'formNote', function () {
    return {
      source: 'website-contact',
      name: val('name'),
      company: val('company'),
      email: val('email'),
      phone: val('phone'),
      service: val('service'),
      position: '',
      message: val('message')
    };
  });

  // Careers application → CRM lead intake.
  // Payload keys are a fixed contract with the API/CRM — do not change them.
  // Screening answers are folded into `message` as labeled lines.
  function checkedVals(name) {
    var boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.prototype.map.call(boxes, function (b) { return b.value; });
  }

  function careersMessage(prefix, ids, certsName) {
    var parts = [
      'Experience: ' + val(ids.experience),
      'Authorized to work: ' + val(ids.authorized),
      '18+: ' + val(ids.adult),
      "Driver's license: " + val(ids.license)
    ];
    var certs = checkedVals(certsName);
    if (certs.length) parts.push('Certs: ' + certs.join(', '));
    parts.push('Languages: ' + val(ids.languages));
    return prefix + parts.join(' | ') + '\n\n' + val(ids.message);
  }

  wireLeadForm('careersForm', 'careersNote', function () {
    return {
      source: 'careers-application',
      name: val('name'),
      company: '',
      email: val('email'),
      phone: val('phone'),
      service: '',
      position: val('position'),
      message: careersMessage('', {
        experience: 'experience',
        authorized: 'authorized',
        adult: 'adult',
        license: 'license',
        languages: 'languages',
        message: 'message'
      }, 'certs')
    };
  });

  // Spanish careers application → same CRM payload shape; the "[ES] "
  // message prefix tells recruiters the applicant used the Spanish page.
  // Select option values are English on both pages.
  wireLeadForm('careersFormEs', 'careersNoteEs', function () {
    return {
      source: 'careers-application',
      name: val('es-name'),
      company: '',
      email: val('es-email'),
      phone: val('es-phone'),
      service: '',
      position: val('es-position'),
      message: careersMessage('[ES] ', {
        experience: 'es-experience',
        authorized: 'es-authorized',
        adult: 'es-adult',
        license: 'es-license',
        languages: 'es-languages',
        message: 'es-message'
      }, 'es-certs')
    };
  });

  // Apply-button preselect (careers pages, progressive enhancement):
  // clicking an <a href="#apply" data-position="..."> sets the position
  // select before the anchor scroll. No preventDefault — the scroll and
  // the no-JS fallback (plain anchor link) keep working.
  document.addEventListener('click', function (ev) {
    if (!ev.target || !ev.target.closest) return;
    var trigger = ev.target.closest('[data-position]');
    if (!trigger) return;
    var position = trigger.getAttribute('data-position');
    var select = document.getElementById('position') ||
      document.getElementById('es-position');
    if (!select || !select.options) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === position) {
        select.value = position;
        return;
      }
    }
  });

  // Service request form (service pages) → dispatch intake.
  // Mirrors the lead form handling: in-flight guard, disabled submit,
  // 4s timeout, and always show the note + reset (never block the user).
  (function () {
    var form = document.getElementById('serviceRequestForm');
    if (!form) return;

    function submitServiceRequest(payload) {
      var controller = new AbortController();
      var timer = setTimeout(function () { controller.abort(); }, 4000);
      return fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      }).finally(function () { clearTimeout(timer); });
    }

    function buildPayload() {
      var urgency = val('sr-urgency');
      var message = val('sr-message');
      return {
        company: val('sr-company'),
        name: val('sr-name'),
        phone: val('sr-phone'),
        email: val('sr-email'),
        building: val('sr-building'),
        leakLocation: '',
        problem: urgency + ' — ' + message,
        emergency: urgency.indexOf('Emergency') === 0,
        urgent: urgency.indexOf('Urgent') === 0
      };
    }

    var inFlight = false;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (inFlight) return; // ignore double submits (e.g. a second Enter press)
      inFlight = true;
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      var settle = function () {
        inFlight = false;
        if (btn) btn.disabled = false;
      };
      var done = function () {
        var note = document.getElementById('serviceRequestNote');
        if (note) note.style.display = 'block';
        form.reset();
      };
      try {
        submitServiceRequest(buildPayload()).then(done, done).finally(settle);
      } catch (e) {
        done();
        settle();
      }
    });
  })();
})();
