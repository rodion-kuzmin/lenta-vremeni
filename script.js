/* ============================================================
   Лента времени · Современная Россия, 1991–2022
   script.js
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // SVG-иконки (Lucide, MIT-лицензия)
  // ----------------------------------------------------------
  const ICONS = {
    politics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 9h6v4H9z"/><path d="M9 21v-4h6v4"/></svg>',
    economy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
    foreign: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    culture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 4H4v3a3 3 0 0 0 3 3"/><path d="M17 4h3v3a3 3 0 0 1-3 3"/></svg>',
    social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  };

  // ----------------------------------------------------------
  // Тематические глифы для каждой иллюстрации
  // Уникальный визуальный элемент-метафора для события
  // ----------------------------------------------------------
  const GLYPHS = {
    'gkchp-1991': '<g><rect x="120" y="180" width="160" height="50" rx="6" fill="rgba(255,255,255,0.18)"/><circle cx="155" cy="240" r="14" fill="rgba(255,255,255,0.25)"/><circle cx="245" cy="240" r="14" fill="rgba(255,255,255,0.25)"/><rect x="170" y="150" width="60" height="40" fill="rgba(255,255,255,0.22)"/><path d="M200 130 L200 110 L220 110 L220 120 L210 120 L210 130" stroke="white" stroke-width="2" fill="none"/></g>',
    'belovezha-1991': '<g><path d="M100 200 L160 160 L220 200 L280 170 L320 200" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none"/><circle cx="160" cy="160" r="8" fill="white" opacity="0.9"/><circle cx="220" cy="200" r="8" fill="white" opacity="0.9"/><circle cx="280" cy="170" r="8" fill="white" opacity="0.9"/><text x="200" y="100" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="Old Standard TT" font-size="22" font-style="italic">СНГ</text></g>',
    'shock-therapy-1992': '<g><path d="M60 230 L100 230 L100 180 L140 180 L140 220 L180 220 L180 160 L220 160 L220 200 L260 200 L260 130 L300 130 L300 180 L340 180" stroke="white" stroke-width="3" fill="none" opacity="0.85"/><path d="M60 100 L340 100" stroke="rgba(255,255,255,0.3)" stroke-width="1" stroke-dasharray="4 4"/><text x="320" y="90" fill="rgba(255,255,255,0.7)" font-size="12" font-family="Geist">×26</text></g>',
    'crisis-1993': '<g><rect x="160" y="110" width="80" height="130" fill="rgba(255,255,255,0.12)" rx="2"/><rect x="170" y="125" width="15" height="20" fill="rgba(255,255,255,0.25)"/><rect x="195" y="125" width="15" height="20" fill="rgba(255,255,255,0.25)"/><rect x="220" y="125" width="15" height="20" fill="rgba(255,255,255,0.25)"/><rect x="170" y="160" width="15" height="20" fill="rgba(255,255,255,0.25)"/><rect x="195" y="160" width="15" height="20" fill="rgba(255,255,255,0.25)"/><rect x="220" y="160" width="15" height="20" fill="rgba(255,255,255,0.25)"/><path d="M90 240 L130 220 L150 230 L155 215" stroke="rgba(255,165,80,0.9)" stroke-width="3" fill="none"/><circle cx="120" cy="180" r="6" fill="rgba(255,80,80,0.85)"/></g>',
    'constitution-1993': '<g><rect x="140" y="120" width="120" height="160" fill="rgba(255,255,255,0.18)" rx="4"/><rect x="155" y="140" width="90" height="3" fill="rgba(255,255,255,0.55)"/><rect x="155" y="155" width="90" height="3" fill="rgba(255,255,255,0.55)"/><rect x="155" y="170" width="75" height="3" fill="rgba(255,255,255,0.55)"/><rect x="155" y="195" width="90" height="3" fill="rgba(255,255,255,0.45)"/><rect x="155" y="208" width="90" height="3" fill="rgba(255,255,255,0.45)"/><rect x="155" y="221" width="60" height="3" fill="rgba(255,255,255,0.45)"/><text x="200" y="105" text-anchor="middle" fill="white" font-family="Old Standard TT" font-size="14" letter-spacing="2">КОНСТИТУЦИЯ</text></g>',
    'chechnya-1994': '<g><path d="M80 240 L140 160 L180 200 L240 130 L280 180 L340 110" stroke="rgba(255,255,255,0.55)" stroke-width="2.5" fill="none"/><path d="M80 240 L340 240" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><circle cx="140" cy="160" r="5" fill="rgba(255,90,90,0.85)"/><circle cx="240" cy="130" r="5" fill="rgba(255,90,90,0.85)"/><path d="M180 70 L220 70 L210 90 L215 110 L200 100 L185 110 L190 90 Z" fill="rgba(255,255,255,0.3)"/></g>',
    'default-1998': '<g><text x="200" y="180" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-family="Old Standard TT" font-size="76" font-weight="700">₽↓</text><text x="200" y="225" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Geist" font-size="14" letter-spacing="3">6 → 21 ₽/$</text></g>',
    'putin-2000': '<g><circle cx="200" cy="170" r="55" fill="rgba(255,255,255,0.12)"/><path d="M145 170 L200 170" stroke="rgba(255,255,255,0.7)" stroke-width="3"/><path d="M200 170 L255 170" stroke="rgba(255,255,255,0.7)" stroke-width="3"/><polygon points="195,160 215,170 195,180" fill="rgba(255,255,255,0.9)"/><text x="155" y="155" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="Old Standard TT" font-size="13">1999</text><text x="245" y="155" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="Old Standard TT" font-size="13">2000</text></g>',
    'kursk-2000': '<g><path d="M70 175 Q200 130 330 175 Q330 195 200 220 Q70 195 70 175 Z" fill="rgba(255,255,255,0.2)"/><rect x="180" y="155" width="40" height="20" fill="rgba(255,255,255,0.28)"/><path d="M195 155 L195 135 L205 135 L205 155" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/><path d="M60 230 L340 230" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-dasharray="3 3"/><path d="M60 230 Q200 250 340 230" stroke="rgba(255,255,255,0.3)" stroke-width="1" fill="none"/></g>',
    'beslan-2004': '<g><rect x="120" y="160" width="160" height="90" fill="rgba(255,255,255,0.15)"/><rect x="135" y="180" width="25" height="35" fill="rgba(255,255,255,0.3)"/><rect x="175" y="180" width="25" height="35" fill="rgba(255,255,255,0.3)"/><rect x="215" y="180" width="25" height="35" fill="rgba(255,255,255,0.3)"/><polygon points="110,160 200,110 290,160" fill="rgba(255,255,255,0.18)"/><text x="200" y="140" text-anchor="middle" fill="white" font-family="Old Standard TT" font-size="16">№ 1</text></g>',
    'natproekty-2005': '<g><g transform="translate(80,160)"><rect width="55" height="55" rx="6" fill="rgba(255,255,255,0.2)"/><path d="M27 18 L27 38 M17 28 L37 28" stroke="white" stroke-width="2.5"/></g><g transform="translate(155,160)"><rect width="55" height="55" rx="6" fill="rgba(255,255,255,0.2)"/><path d="M15 35 L27 22 L35 30 L45 18" stroke="white" stroke-width="2.5" fill="none"/></g><g transform="translate(230,160)"><rect width="55" height="55" rx="6" fill="rgba(255,255,255,0.2)"/><path d="M15 40 L15 25 L27 15 L40 25 L40 40 Z" stroke="white" stroke-width="2" fill="none"/></g><g transform="translate(305,160)"><rect width="55" height="55" rx="6" fill="rgba(255,255,255,0.2)"/><path d="M20 38 Q27 22 35 38 Q40 28 45 38" stroke="white" stroke-width="2.5" fill="none"/></g></g>',
    'georgia-2008': '<g><text x="200" y="170" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-family="Old Standard TT" font-size="68" font-weight="700">08.08.08</text><path d="M120 195 L280 195" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><text x="200" y="225" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Geist" font-size="13" letter-spacing="2">5 ДНЕЙ</text></g>',
    'crisis-2008': '<g><path d="M60 130 L100 145 L130 140 L160 170 L195 200 L235 225 L290 235 L340 240" stroke="white" stroke-width="3" fill="none" opacity="0.9"/><circle cx="195" cy="200" r="6" fill="rgba(255,140,140,0.95)"/><path d="M60 130 L60 240 L340 240" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><text x="220" y="120" fill="rgba(255,255,255,0.8)" font-family="Old Standard TT" font-size="22" font-style="italic">−7,8%</text></g>',
    'bolotnaya-2011': '<g><g opacity="0.85"><circle cx="120" cy="200" r="12" fill="white" opacity="0.6"/><rect x="115" y="210" width="10" height="30" fill="white" opacity="0.6"/><circle cx="160" cy="195" r="13" fill="white" opacity="0.7"/><rect x="154" y="206" width="12" height="34" fill="white" opacity="0.7"/><circle cx="205" cy="205" r="12" fill="white" opacity="0.6"/><rect x="200" y="215" width="10" height="28" fill="white" opacity="0.6"/><circle cx="245" cy="195" r="13" fill="white" opacity="0.75"/><rect x="239" y="206" width="12" height="34" fill="white" opacity="0.75"/><circle cx="290" cy="200" r="12" fill="white" opacity="0.6"/><rect x="285" y="210" width="10" height="30" fill="white" opacity="0.6"/></g><rect x="140" y="140" width="120" height="40" fill="rgba(255,255,255,0.25)" rx="3"/><text x="200" y="166" text-anchor="middle" fill="white" font-family="Old Standard TT" font-size="14">За честные выборы</text></g>',
    'sochi-2014': '<g><circle cx="135" cy="170" r="28" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="3"/><circle cx="185" cy="170" r="28" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="3"/><circle cx="235" cy="170" r="28" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="3"/><circle cx="160" cy="205" r="28" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="3"/><circle cx="210" cy="205" r="28" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="3"/><circle cx="285" cy="170" r="22" fill="rgba(255,200,80,0.85)"/><text x="285" y="176" text-anchor="middle" fill="rgba(60,40,10,0.95)" font-family="Old Standard TT" font-size="20" font-weight="700">1</text></g>',
    'crimea-2014': '<g><path d="M200 90 L210 110 L195 130 L200 150" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="3 3" fill="none"/><path d="M170 140 Q170 110 195 105 Q220 95 245 110 Q270 120 270 150 Q270 180 245 195 Q230 210 200 215 Q175 215 165 195 Q150 175 170 140 Z" fill="rgba(255,255,255,0.22)"/><circle cx="215" cy="160" r="6" fill="rgba(255,180,80,0.9)"/><text x="215" y="240" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="Old Standard TT" font-size="14" letter-spacing="3">КРЫМ</text></g>',
    'wc-2018': '<g><circle cx="200" cy="170" r="50" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/><polygon points="200,135 215,148 210,168 190,168 185,148" fill="rgba(20,20,30,0.55)"/><path d="M200 135 L172 152 M200 135 L228 152 M185 168 L165 192 M215 168 L235 192 M190 168 L200 195 M210 168 L200 195" stroke="rgba(20,20,30,0.55)" stroke-width="1.5"/><circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.7)"/><circle cx="300" cy="110" r="3" fill="rgba(255,255,255,0.7)"/><circle cx="320" cy="220" r="3" fill="rgba(255,255,255,0.7)"/><circle cx="80" cy="220" r="3" fill="rgba(255,255,255,0.7)"/></g>',
    'covid-2020': '<g><circle cx="200" cy="170" r="48" fill="rgba(255,255,255,0.18)"/><g stroke="rgba(255,255,255,0.7)" stroke-width="3" stroke-linecap="round"><line x1="200" y1="122" x2="200" y2="112"/><line x1="200" y1="218" x2="200" y2="228"/><line x1="152" y1="170" x2="142" y2="170"/><line x1="248" y1="170" x2="258" y2="170"/><line x1="166" y1="136" x2="159" y2="129"/><line x1="234" y1="204" x2="241" y2="211"/><line x1="166" y1="204" x2="159" y2="211"/><line x1="234" y1="136" x2="241" y2="129"/></g><circle cx="180" cy="160" r="5" fill="rgba(255,140,140,0.9)"/><circle cx="220" cy="180" r="5" fill="rgba(255,140,140,0.9)"/><circle cx="195" cy="190" r="5" fill="rgba(255,140,140,0.9)"/></g>',
    'svo-2022': '<g><path d="M200 80 L200 250" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-dasharray="4 4"/><text x="200" y="160" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-family="Old Standard TT" font-size="56" font-weight="700">24.02</text><text x="200" y="190" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="Old Standard TT" font-size="26">2022</text><path d="M120 220 L280 220" stroke="rgba(255,255,255,0.4)" stroke-width="2"/></g>'
  };

  // ----------------------------------------------------------
  // Генерация SVG-иллюстрации для карточки
  // ----------------------------------------------------------
  function buildIllustration(event) {
    const gradients = {
      'yeltsin': ['#b94545', '#6a1f1f'],
      'stability': ['#3b6b96', '#1d3a5c'],
      'modernization': ['#2e8a6a', '#185139'],
      'new-reality': ['#6a4d8a', '#2e1f4a']
    };
    const [c1, c2] = gradients[event.era] || gradients.yeltsin;
    const gradId = 'g-' + event.id;
    const glyph = GLYPHS[event.id] || '';

    return `
      <svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Иллюстрация: ${escapeHtml(event.title)}">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${c1}"/>
            <stop offset="100%" stop-color="${c2}"/>
          </linearGradient>
          <pattern id="dots-${event.id}" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.08)"/>
          </pattern>
        </defs>
        <rect width="400" height="290" fill="url(#${gradId})"/>
        <rect width="400" height="290" fill="url(#dots-${event.id})"/>
        <text x="24" y="48" fill="rgba(255,255,255,0.85)" font-family="Old Standard TT, serif" font-size="58" font-weight="700">${event.year}</text>
        <text x="376" y="270" text-anchor="end" fill="rgba(255,255,255,0.55)" font-family="Geist, sans-serif" font-size="11" letter-spacing="2">${escapeHtml(event.categoryLabel.toUpperCase())}</text>
        ${glyph}
      </svg>
    `;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  // ----------------------------------------------------------
  // Рендер ленты
  // ----------------------------------------------------------
  function renderTimeline() {
    const root = document.getElementById('timeline');
    const eventsByEra = {};
    EVENTS.forEach(e => {
      (eventsByEra[e.era] = eventsByEra[e.era] || []).push(e);
    });

    const html = ERAS.map(era => {
      const items = eventsByEra[era.id] || [];
      const cards = items.map((e, idx) => buildEventCard(e, idx)).join('');
      return `
        <section class="era-section" id="era-${era.id}" data-era="${era.id}">
          <header class="era-heading">
            <div class="era-heading__pill">
              <span class="era-heading__title">${era.label}</span>
            </div>
          </header>
          ${cards}
        </section>
      `;
    }).join('');

    root.innerHTML = html;
  }

  function buildEventCard(e, idx) {
    const side = idx % 2 === 0 ? 'left' : 'right';
    const catVar = `--cat-color: var(--c-${e.category});`;
    const detailsHtml = e.fullText.map((p, i) => {
      const heads = ['Предпосылки', 'Суть события', 'Последствия'];
      return `<h4>${heads[i] || ''}</h4><p>${escapeHtml(p)}</p>`;
    }).join('');
    const sourcesHtml = e.sources.map(s => `<li>${escapeHtml(s)}</li>`).join('');

    return `
      <article class="event"
               data-side="${side}"
               data-category="${e.category}"
               data-era="${e.era}"
               data-expanded="false"
               style="${catVar}">
        <div class="event__spacer" aria-hidden="true"></div>
        <div class="event__node">
          <span class="event__year">${e.year}</span>
        </div>
        <div class="event__card">
          <div class="event__illustration">
            <img src="${escapeHtml(e.image)}" alt="${escapeHtml(e.title)}" loading="lazy">
          </div>
          <div class="event__body">
            <div class="event__meta">
              <span class="event__category-tag">${ICONS[e.category] || ''} ${escapeHtml(e.categoryLabel)}</span>
              <time class="event__date" datetime="${e.date}">${escapeHtml(e.dateLabel)}</time>
            </div>
            <h3 class="event__title">${escapeHtml(e.title)}</h3>
            <p class="event__short">${escapeHtml(e.shortText)}</p>
            <button type="button" class="event__toggle" aria-expanded="false">
              <span class="event__toggle-text">Подробнее</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="event__details">
              <div class="event__details-inner">
                ${detailsHtml}
                <h4>Источники по событию</h4>
                <ol class="event__sources">${sourcesHtml}</ol>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // ----------------------------------------------------------
  // Аккордеон
  // ----------------------------------------------------------
  function bindAccordions() {
    document.querySelectorAll('.event__toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const event = btn.closest('.event');
        const expanded = event.getAttribute('data-expanded') === 'true';
        event.setAttribute('data-expanded', !expanded);
        btn.setAttribute('aria-expanded', !expanded);
        btn.querySelector('.event__toggle-text').textContent = expanded ? 'Подробнее' : 'Свернуть';
      });
    });
  }

  // ----------------------------------------------------------
  // Фильтрация по категориям
  // ----------------------------------------------------------
  function bindFilters() {
    const chips = document.querySelectorAll('#category-filters .chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('chip--active'));
        chip.classList.add('chip--active');
        const cat = chip.getAttribute('data-category');
        document.querySelectorAll('.event').forEach(ev => {
          if (cat === 'all') {
            ev.classList.remove('is-hidden');
          } else {
            const matches = ev.getAttribute('data-category') === cat;
            ev.classList.toggle('is-hidden', !matches);
          }
        });
      });
    });
  }

  // ----------------------------------------------------------
  // Появление карточек при скролле
  // ----------------------------------------------------------
  function bindIntersection() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.event').forEach(el => io.observe(el));
  }

  // ----------------------------------------------------------
  // Подсветка активной эпохи в навигации + скользящий индикатор
  // Индикатор синхронизирован с фактической прокруткой по ленте
  // ----------------------------------------------------------
  function bindEraNav() {
    const nav = document.getElementById('era-nav');
    const navInner = nav.querySelector('.era-nav__inner');
    const navItems = Array.from(document.querySelectorAll('.era-nav__item'));
    const sections = Array.from(document.querySelectorAll('.era-section'));

    // Создаём элемент-индикатор
    const indicator = document.createElement('span');
    indicator.className = 'era-nav__indicator';
    navInner.appendChild(indicator);

    let ticking = false;
    function update() {
      // Якорь = середина высоты era-nav + немного ниже (75 px). По этой точке считаем, какая секция «активна»
      const navRect = nav.getBoundingClientRect();
      const anchorY = navRect.bottom + 75;

      let activeIndex = -1;
      let progress = 0;

      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        const r = s.getBoundingClientRect();
        if (r.top <= anchorY && r.bottom > anchorY) {
          activeIndex = i;
          const total = r.height;
          const passed = anchorY - r.top;
          progress = Math.max(0, Math.min(1, passed / total));
          break;
        }
      }
      // Если ещё не дошли до первой секции — индикатор тушим
      if (activeIndex === -1) {
        const firstRect = sections[0].getBoundingClientRect();
        if (anchorY < firstRect.top) {
          activeIndex = -1;
        } else {
          activeIndex = sections.length - 1;
          progress = 1;
        }
      }

      navItems.forEach((n, i) => n.classList.toggle('is-active', i === activeIndex));

      if (activeIndex >= 0) {
        const item = navItems[activeIndex];
        const itemRect = item.getBoundingClientRect();
        const innerRect = navInner.getBoundingClientRect();
        const left = itemRect.left - innerRect.left;
        const width = itemRect.width;
        indicator.style.opacity = '1';
        indicator.style.left = left + 'px';
        indicator.style.width = width + 'px';
      } else {
        indicator.style.opacity = '0';
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Первый запуск с небольшой задержкой, чтобы layout успел рассчитаться
    setTimeout(update, 50);
  }

  // ----------------------------------------------------------
  // Прогресс-бар + кнопка «наверх»
  // ----------------------------------------------------------
  function bindScrollUI() {
    const bar = document.getElementById('scroll-progress');
    const toTop = document.getElementById('to-top');
    let ticking = false;
    function update() {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (scrolled * 100) + '%';
      toTop.classList.toggle('is-visible', h.scrollTop > 600);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ----------------------------------------------------------
  // Переключение темы
  // ----------------------------------------------------------
  function bindTheme() {
    const btn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('rh-theme');
    if (saved === 'dark') root.setAttribute('data-theme', 'dark');
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('rh-theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('rh-theme', 'dark');
      }
    });
  }

  // ----------------------------------------------------------
  // Старт
  // ----------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    bindAccordions();
    bindFilters();
    bindIntersection();
    bindEraNav();
    bindScrollUI();
    bindTheme();
  });
})();
