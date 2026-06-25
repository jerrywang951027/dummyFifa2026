/* FIFA World Cup 2026 — Official Hospitality (replica)
   Lightweight vanilla-JS for all interactive behaviour. */
(() => {
  // --------- Simple client-side password gate ----------
  // NOTE: cosmetic only — credentials are visible in source. See index.html for details.
  const AUTH_USER = 'sfdc';
  const AUTH_PASS = 'admin123';
  const authForm = document.getElementById('authForm');
  if (authForm) {
    const userEl = document.getElementById('authUser');
    const passEl = document.getElementById('authPass');
    const errEl  = document.getElementById('authError');
    const gateEl = document.getElementById('authGate');
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (userEl.value === AUTH_USER && passEl.value === AUTH_PASS) {
        try { sessionStorage.setItem('fifa26-auth', 'ok'); } catch (_) { /* ignore */ }
        document.documentElement.classList.remove('needs-auth');
        if (gateEl) gateEl.style.display = 'none';
      } else {
        errEl.hidden = false;
        passEl.value = '';
        passEl.focus();
      }
    });
  }

  // --------- Country selector modal ----------
  const modal = document.getElementById('countryModal');
  const countryBtn = document.getElementById('countryBtn');
  const countryFlag = document.getElementById('countryFlag');
  const countryLabel = document.getElementById('countryLabel');
  const countryMap = {
    usa: { label: 'USA',    flag: 'assets/flag-usa.webp' },
    can: { label: 'Canada', flag: 'assets/flag-canada.webp' },
    mex: { label: 'Mexico', flag: 'assets/flag-mexico.webp' },
  };
  if (!localStorage.getItem('fifa26-country')) {
    setTimeout(() => { modal.hidden = false; }, 400);
  }
  document.querySelectorAll('.country-tile').forEach(t => {
    t.addEventListener('click', () => {
      const c = countryMap[t.dataset.country];
      countryFlag.src = c.flag; countryFlag.alt = c.label;
      countryLabel.textContent = c.label;
      localStorage.setItem('fifa26-country', t.dataset.country);
      modal.hidden = true;
    });
  });
  countryBtn?.addEventListener('click', () => { modal.hidden = false; });

  // --------- Mobile nav ----------
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // --------- Nav dropdown click-toggle (for touch and click-to-open) ----------
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(dd => {
    const btn = dd.querySelector('.nav__link');
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      const wasOpen = dd.classList.contains('is-open');
      dropdowns.forEach(d => d.classList.remove('is-open'));
      if (!wasOpen) dd.classList.add('is-open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdowns.forEach(d => d.classList.remove('is-open'));
    }
  });

  // --------- Browse tab switch (Host City / Team) ----------
  const browseTabs = document.querySelectorAll('.tab[data-browse]');
  const browsePanels = document.querySelectorAll('.browse__panel');
  browseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      browseTabs.forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      const target = tab.dataset.browse;
      browsePanels.forEach(p => { p.hidden = p.dataset.panel !== target; });
    });
  });

  // --------- Match filter tabs ----------
  const matchTabs = document.querySelectorAll('.tab[data-match-filter]');
  const matchCards = document.querySelectorAll('.match-card');
  matchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      matchTabs.forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
      const f = tab.dataset.matchFilter;
      matchCards.forEach(c => {
        c.classList.toggle('is-hidden', f !== 'popular' && c.dataset.cat !== f);
      });
    });
  });

  // --------- Countdown to kick-off ----------
  // Opening match 11 June 2026, 19:00 local (Mexico City = UTC-6 in June, so 01:00 UTC 12 Jun)
  const kickoff = new Date('2026-06-12T01:00:00Z').getTime();
  const el = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  const pad = n => String(Math.max(0, n)).padStart(2, '0');
  const tick = () => {
    const delta = kickoff - Date.now();
    if (delta <= 0) {
      el.d.textContent = el.h.textContent = el.m.textContent = el.s.textContent = '00';
      return;
    }
    const s = Math.floor(delta / 1000);
    el.d.textContent = pad(Math.floor(s / 86400));
    el.h.textContent = pad(Math.floor((s % 86400) / 3600));
    el.m.textContent = pad(Math.floor((s % 3600) / 60));
    el.s.textContent = pad(s % 60);
  };
  if (el.d) { tick(); setInterval(tick, 1000); }

  // --------- Reveal-on-scroll ----------
  const revealTargets = document.querySelectorAll(
    '.section__head, .offering, .match-card, .addl, .feature, .faq details, .tier-progress, .suites__inner > *, .why__media, .why__copy, .lounge, .city-row, .team'
  );
  revealTargets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealTargets.forEach(t => io.observe(t));

  // --------- Nav shadow on scroll ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.style.boxShadow = window.scrollY > 4 ? '0 10px 30px rgba(5,9,14,.08)' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
