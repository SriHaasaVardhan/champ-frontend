/**
 * CHAMPIONS LEAGUE 2026 - Interactive Application Logic
 * KMEC × NGIT Inter-College Strategy Tournament
 * Learn • Build • Compete with AI
 * Minimal Claymorphism • Spring Motion Engine • Rich Tactile Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- SCROLL PROGRESS BAR ---
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrollPercent}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // --- REUSABLE SLIDING CLAY GLIDER HELPER ---
  function moveClayGlider(glider, targetEl, containerEl) {
    if (!glider || !targetEl || !containerEl) return;
    const width = targetEl.offsetWidth;
    if (width === 0) return;
    let offsetLeft = 0;
    let node = targetEl;
    while (node && node !== containerEl) {
      offsetLeft += node.offsetLeft;
      node = node.offsetParent;
    }
    glider.style.width = `${width}px`;
    glider.style.transform = `translate3d(${offsetLeft}px, 0, 0)`;
  }

  // --- SCROLL REVEAL OBSERVER (ANIMATION ON EVERY SCROLL) ---
  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // --- TACTILE CLAY CLICK RIPPLE ENGINE (DISABLED FOR SWISS MINIMALIST STYLE) ---
  const rippleSelector =
    '.btn, .fact-mini-card, .choice-card-label, .elig-chip, .match-card, .tabs-quick-btn, .phase-pill-btn, .countdown-box-mini, .micro-clay-chip';

  // Disabled in Swiss Minimalist mode - subtle hover transitions used instead
  /*
  document.addEventListener('pointerdown', (e) => {
    if (prefersReducedMotion) return;
    const surface = e.target.closest(rippleSelector);
    if (!surface) return;

    const computedPos = window.getComputedStyle(surface).position;
    if (computedPos === 'static') {
      surface.style.position = 'relative';
    }
    if (window.getComputedStyle(surface).overflow !== 'hidden') {
      surface.style.overflow = 'hidden';
    }

    const rect = surface.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.15;
    const ripple = document.createElement('span');
    ripple.className = 'clay-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    surface.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
  */

  // --- SPRING PHYSICS MAGNETIC + SQUISH ENGINE (DISABLED FOR SWISS MINIMALIST STYLE) ---
  // In Swiss International Style, controls maintain precise, disciplined alignment with subtle 200ms transitions

  // --- 3D CLAY PERSPECTIVE TILT + DYNAMIC STUDIO SHEEN (DISABLED FOR SWISS MINIMALIST STYLE) ---
  // Flat, architectural content surfaces without 3D tilt or perspective warping

  // --- HEADER NAVIGATION GLIDER & SCROLL-SPY ---
  const navShell = document.querySelector('.nav-pill-shell');
  const navGlider = document.getElementById('nav-clay-glider');
  const navLinks = document.querySelectorAll('.nav-link');
  let activeNavLink = document.querySelector('.nav-link.active') || navLinks[0];

  function syncNavGlider(linkEl = activeNavLink) {
    if (!navShell || !navGlider || !linkEl) return;
    moveClayGlider(navGlider, linkEl, navShell);
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => syncNavGlider(link));
    link.addEventListener('click', () => {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      activeNavLink = link;
      syncNavGlider(link);
      document.body.classList.remove('mobile-nav-active');
      playTone(540, 'sine', 0.05, 0.04);
    });
  });

  if (navShell) {
    navShell.addEventListener('mouseleave', () => syncNavGlider(activeNavLink));
  }

  const trackedSections = ['hero', 'quick-stats', 'tournament-tabs', 'register', 'faq']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateActiveSectionOnScroll() {
    const scrollMid = window.scrollY + window.innerHeight * 0.34;
    let matchedSection = trackedSections[0];
    trackedSections.forEach((sec) => {
      if (sec.offsetTop <= scrollMid) {
        matchedSection = sec;
      }
    });
    if (matchedSection) {
      const matchingLink = document.querySelector(`.nav-link[data-section="${matchedSection.id}"]`);
      if (matchingLink && matchingLink !== activeNavLink) {
        navLinks.forEach((l) => l.classList.remove('active'));
        matchingLink.classList.add('active');
        activeNavLink = matchingLink;
        syncNavGlider(activeNavLink);
      }
    }
  }

  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });

  function syncAllGliders() {
    syncNavGlider(activeNavLink);
    syncPhaseGlider();
    syncQuickTabGlider();
    syncBracketGlider();
    document.querySelectorAll('.accordion-item.active .accordion-content').forEach((content) => {
      content.style.maxHeight = content.scrollHeight + 'px';
    });
  }

  window.addEventListener('resize', () => {
    syncAllGliders();
  });
  requestAnimationFrame(syncAllGliders);
  window.addEventListener('load', syncAllGliders);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncAllGliders);
  }

  // --- INTERACTIVE HERO PHASE SWITCHER (LEARN • BUILD • COMPETE WITH AI) ---
  const phaseSwitcher = document.querySelector('.hero-phase-switcher');
  const phaseGlider = document.getElementById('hero-phase-glider');
  const phaseBtns = document.querySelectorAll('.phase-pill-btn');
  const phaseCaption = document.getElementById('hero-phase-caption');
  const phaseDescriptions = {
    learn: 'Master strategy game heuristics and AI code workflows in guided morning practice labs.',
    build: 'Develop standalone Python strategy bots using Claude, Cursor, Gemini CLI, or ChatGPT.',
    compete: 'Submit before the 02:00 PM code freeze and clash live across 32-squad knockouts.'
  };

  function syncPhaseGlider() {
    const activePhaseBtn = document.querySelector('.phase-pill-btn.active');
    moveClayGlider(phaseGlider, activePhaseBtn, phaseSwitcher);
  }

  function activatePhase(btn) {
    if (!btn || btn.classList.contains('active')) return;
    phaseBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    moveClayGlider(phaseGlider, btn, phaseSwitcher);

    const phaseKey = btn.getAttribute('data-phase');
    if (phaseCaption && phaseDescriptions[phaseKey]) {
      phaseCaption.classList.add('morphing');
      setTimeout(() => {
        phaseCaption.textContent = phaseDescriptions[phaseKey];
        phaseCaption.classList.remove('morphing');
      }, 170);
    }
    playTone(560, 'triangle', 0.05, 0.035);
  }

  phaseBtns.forEach((btn) => {
    btn.addEventListener('click', () => activatePhase(btn));
    btn.addEventListener('mouseenter', () => activatePhase(btn));
  });
  requestAnimationFrame(syncPhaseGlider);

  // --- INTERACTIVE HERO LOGO & QUICK FACT TILES ---
  const heroLogoBox = document.getElementById('hero-logo-interactive');
  if (heroLogoBox) {
    heroLogoBox.addEventListener('click', (e) => {
      const rect = heroLogoBox.getBoundingClientRect();
      launchClayConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);
      playTone(660, 'triangle', 0.1, 0.05);
      showToast('Champions League 2026 • KMEC × NGIT');
    });
  }

  // --- HORIZONTAL SIDE-SCROLLING TABS + MOMENTUM DRAG + QUICK-BAR ---
  const tabsTrack = document.getElementById('horizontal-tabs-track');
  const scrollPrevBtn = document.getElementById('scroll-prev-btn');
  const scrollNextBtn = document.getElementById('scroll-next-btn');
  const quickBar = document.getElementById('tabs-quick-bar');
  const quickGlider = document.getElementById('tabs-quick-glider');
  const quickBtns = document.querySelectorAll('.tabs-quick-btn');
  const tabCards = document.querySelectorAll('.horizontal-tab-card');
  const progressTrack = document.getElementById('carousel-progress-track');
  const progressThumb = document.getElementById('carousel-progress-thumb');

  function syncQuickTabGlider() {
    const activeQuick = document.querySelector('.tabs-quick-btn.active');
    moveClayGlider(quickGlider, activeQuick, quickBar);
  }

  function scrollToTabCard(index) {
    if (!tabsTrack || !tabCards[index]) return;
    const card = tabCards[index];
    const targetLeft = card.offsetLeft - tabsTrack.offsetLeft - 10;
    tabsTrack.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    quickBtns.forEach((b, i) => b.classList.toggle('active', i === index));
    syncQuickTabGlider();
    playTone(500 + index * 25, 'sine', 0.05, 0.04);
  }

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-tab-index'), 10) || 0;
      scrollToTabCard(idx);
    });
  });
  requestAnimationFrame(syncQuickTabGlider);

  // Hero Quick Fact Tiles Jump Actions
  document.querySelectorAll('.clay-interactive-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const jumpSel = tile.getAttribute('data-jump');
      const pulseId = tile.getAttribute('data-pulse');
      const tabJump = tile.getAttribute('data-tab-jump');

      if (tabJump !== null) {
        const tabsSec = document.getElementById('tournament-tabs');
        if (tabsSec) tabsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => scrollToTabCard(parseInt(tabJump, 10)), 320);
      } else if (jumpSel) {
        const dest = document.querySelector(jumpSel);
        if (dest) dest.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (pulseId) {
          const pulseCard = document.getElementById(pulseId);
          if (pulseCard) {
            pulseCard.classList.remove('clay-pulse-highlight');
            void pulseCard.offsetWidth;
            pulseCard.classList.add('clay-pulse-highlight');
          }
        }
      }
      playTone(520, 'triangle', 0.06, 0.04);
    });
  });

  if (tabsTrack && scrollPrevBtn && scrollNextBtn) {
    scrollPrevBtn.addEventListener('click', () => {
      tabsTrack.scrollBy({ left: -475, behavior: 'smooth' });
      playTone(450, 'sine', 0.04);
    });

    scrollNextBtn.addEventListener('click', () => {
      tabsTrack.scrollBy({ left: 475, behavior: 'smooth' });
      playTone(490, 'sine', 0.04);
    });

    // Sync Quick Tab Bar + Scrubber Progress on Track Scroll
    tabsTrack.addEventListener(
      'scroll',
      () => {
        const maxScroll = Math.max(1, tabsTrack.scrollWidth - tabsTrack.clientWidth);
        const ratio = Math.min(1, Math.max(0, tabsTrack.scrollLeft / maxScroll));
        if (progressThumb) {
          progressThumb.style.width = `${18 + ratio * 82}%`;
        }

        let closestIdx = 0;
        let minDelta = Infinity;
        const trackLeftEdge = tabsTrack.scrollLeft + 80;
        tabCards.forEach((card, idx) => {
          const cardPos = card.offsetLeft - tabsTrack.offsetLeft;
          const delta = Math.abs(cardPos - trackLeftEdge);
          if (delta < minDelta) {
            minDelta = delta;
            closestIdx = idx;
          }
        });

        const currentActive = document.querySelector('.tabs-quick-btn.active');
        if (quickBtns[closestIdx] && quickBtns[closestIdx] !== currentActive) {
          quickBtns.forEach((b, i) => b.classList.toggle('active', i === closestIdx));
          syncQuickTabGlider();
        }
      },
      { passive: true }
    );

    if (progressTrack) {
      progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const maxScroll = tabsTrack.scrollWidth - tabsTrack.clientWidth;
        tabsTrack.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
        playTone(510, 'sine', 0.04);
      });
    }

    // Momentum Drag-to-Scroll Physics for Desktop
    let isDown = false;
    let startX = 0;
    let scrollLeftPos = 0;
    let lastX = 0;
    let velocity = 0;
    let momentumId = null;

    function stopMomentum() {
      if (momentumId) {
        cancelAnimationFrame(momentumId);
        momentumId = null;
      }
    }

    function runMomentum() {
      tabsTrack.scrollLeft -= velocity;
      velocity *= 0.92;
      if (Math.abs(velocity) > 0.6) {
        momentumId = requestAnimationFrame(runMomentum);
      } else {
        tabsTrack.classList.remove('dragging');
        momentumId = null;
      }
    }

    tabsTrack.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      stopMomentum();
      isDown = true;
      tabsTrack.classList.add('dragging');
      startX = e.pageX - tabsTrack.offsetLeft;
      lastX = e.pageX;
      velocity = 0;
      scrollLeftPos = tabsTrack.scrollLeft;
    });

    tabsTrack.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      runMomentum();
    });

    tabsTrack.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      runMomentum();
    });

    tabsTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tabsTrack.offsetLeft;
      velocity = (e.pageX - lastX) * 1.35;
      lastX = e.pageX;
      const walk = (x - startX) * 1.3;
      tabsTrack.scrollLeft = scrollLeftPos - walk;
    });
  }

  // --- TACTILE CLAY SOUND EFFECTS (Web Audio API) ---
  let soundEnabled = false;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type === 'sawtooth' ? 'triangle' : type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.86, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playSuccessChime() {
    if (!soundEnabled || !audioCtx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.25, 0.08), idx * 90);
    });
  }

  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle('active', soundEnabled);
      if (soundEnabled) {
        showToast('Sound feedback enabled');
        playTone(600, 'sine', 0.1, 0.08);
      } else {
        showToast('Sound muted');
      }
    });
  }

  // --- TOAST NOTIFICATIONS ---
  const toastContainer = document.getElementById('toast-container');
  window.showToast = function(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    playTone(520, 'sine', 0.06, 0.04);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  };

  // --- PARTICLE BACKGROUND CANVAS (DISABLED FOR SWISS MINIMALIST STYLE) ---
  // In Swiss International Style, clean near-white architectural surfaces replace particle effects

  // --- LOGO-PALETTE CONFETTI CELEBRATION ENGINE ---
  // Neutralized for Swiss International Style (safe no-op to preserve caller compatibility)
  function launchClayConfetti(originX, originY, count) {
    // Purposefully minimal: no distracting confetti bursts
    return;
  }

  // --- COUNTDOWN TIMER ---
  // Event Date: 21 November 2026, 09:30:00 IST
  const eventDate = new Date('2026-11-21T09:30:00+05:30').getTime();
  const dElem = document.getElementById('count-days');
  const hElem = document.getElementById('count-hours');
  const mElem = document.getElementById('count-mins');
  const sElem = document.getElementById('count-secs');
  const totalHoursElem = document.getElementById('count-total-hours');
  const countdownGrid = document.getElementById('countdown-grid');
  const countdownAlt = document.getElementById('countdown-alt-readout');
  const countdownModeBtn = document.getElementById('countdown-mode-btn');
  const countdownModeLabel = document.getElementById('countdown-mode-label');
  let altCountdownMode = false;

  function setDigitWithPop(elem, nextText) {
    if (!elem) return;
    if (elem.textContent !== nextText) {
      elem.textContent = nextText;
      if (!prefersReducedMotion) {
        elem.classList.remove('digit-pop');
        void elem.offsetWidth;
        elem.classList.add('digit-pop');
      }
    }
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
      if (dElem) dElem.textContent = '00';
      if (hElem) hElem.textContent = '00';
      if (mElem) mElem.textContent = '00';
      if (sElem) sElem.textContent = '00';
      if (totalHoursElem) totalHoursElem.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    const totalHrs = Math.floor(diff / (1000 * 60 * 60));

    setDigitWithPop(dElem, String(days).padStart(2, '0'));
    setDigitWithPop(hElem, String(hours).padStart(2, '0'));
    setDigitWithPop(mElem, String(mins).padStart(2, '0'));
    setDigitWithPop(sElem, String(secs).padStart(2, '0'));
    if (totalHoursElem) totalHoursElem.textContent = totalHrs.toLocaleString();
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  function toggleCountdownDisplay() {
    altCountdownMode = !altCountdownMode;
    if (countdownGrid) countdownGrid.hidden = altCountdownMode;
    if (countdownAlt) countdownAlt.hidden = !altCountdownMode;
    if (countdownModeLabel) {
      countdownModeLabel.textContent = altCountdownMode ? 'Total Hrs' : 'Live IST';
    }
    playTone(530, 'triangle', 0.05, 0.04);
  }

  if (countdownModeBtn) {
    countdownModeBtn.addEventListener('click', toggleCountdownDisplay);
  }
  document.querySelectorAll('.countdown-box-mini').forEach((box) => {
    box.addEventListener('click', toggleCountdownDisplay);
  });

  // --- HEADER SCROLL & FLOATING CTA ---
  const header = document.querySelector('.site-header');
  const floatingCta = document.getElementById('floating-cta');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (floatingCta) {
      if (scrollY > 480) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    }
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      playTone(480, 'sine', 0.05);
    });
  }

  // --- SEED TEAMS DATA & LIVE SLOTS SYSTEM ---
  const MAX_TEAMS = 32;
  const initialRegisteredTeams = [
    { id: 'CL26-KMEC-01', name: 'NeuralNomads', college: 'KMEC', branch: 'CSE', members: 4, leader: 'Aditya Rao' },
    { id: 'CL26-NGIT-02', name: 'QuantumForge', college: 'NGIT', branch: 'CSM', members: 3, leader: 'Sahithi Reddy' },
    { id: 'CL26-KMEC-03', name: 'VectorVanguards', college: 'KMEC', branch: 'CSM', members: 4, leader: 'Rohan Sharma' },
    { id: 'CL26-KMEC-04', name: 'DeepMiners', college: 'KMEC', branch: 'CSE', members: 3, leader: 'Kavya Varma' },
    { id: 'CL26-NGIT-05', name: 'BitBenders', college: 'NGIT', branch: 'CSE', members: 4, leader: 'Nikhil Kumar' },
    { id: 'CL26-NGIT-06', name: 'ApexHeuristics', college: 'NGIT', branch: 'CSM', members: 4, leader: 'Tanvi Joshi' },
    { id: 'CL26-KMEC-07', name: 'BinaryStrikes', college: 'KMEC', branch: 'CSE', members: 3, leader: 'Harshith Goud' },
    { id: 'CL26-KMEC-08', name: 'CyberSpartans', college: 'KMEC', branch: 'CSM', members: 4, leader: 'Ananya Deshmukh' },
    { id: 'CL26-NGIT-09', name: 'MatrixMavericks', college: 'NGIT', branch: 'CSE', members: 4, leader: 'Vikram Pillai' },
    { id: 'CL26-NGIT-10', name: 'LogicLegion', college: 'NGIT', branch: 'CSM', members: 3, leader: 'Pooja Iyer' },
    { id: 'CL26-KMEC-11', name: 'SynapseSlash', college: 'KMEC', branch: 'CSE', members: 4, leader: 'Manoj Krishna' },
    { id: 'CL26-KMEC-12', name: 'ZeroDayBot', college: 'KMEC', branch: 'CSM', members: 3, leader: 'Siddharth Roy' },
    { id: 'CL26-NGIT-13', name: 'Algorunners', college: 'NGIT', branch: 'CSE', members: 4, leader: 'Pranitha K' },
    { id: 'CL26-KMEC-14', name: 'HeuristicHounds', college: 'KMEC', branch: 'CSE', members: 4, leader: 'Tarun V.' }
  ];

  let activeRosterFilter = 'ALL';
  let rosterSearchQuery = '';

  function getSavedTeams() {
    try {
      const stored = localStorage.getItem('cl26_teams');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    localStorage.setItem('cl26_teams', JSON.stringify(initialRegisteredTeams));
    return initialRegisteredTeams;
  }

  function updateSlotCounters() {
    const teams = getSavedTeams();
    const count = teams.length;
    const remaining = Math.max(0, MAX_TEAMS - count);
    const percent = Math.min(100, (count / MAX_TEAMS) * 100);
    const kmecCount = teams.filter((t) => t.college === 'KMEC').length;
    const ngitCount = teams.filter((t) => t.college === 'NGIT').length;

    const slotElements = document.querySelectorAll('.slot-count-val');
    slotElements.forEach((el) => {
      el.textContent = `${count} / ${MAX_TEAMS}`;
    });

    const remElements = document.querySelectorAll('.slot-remaining-val');
    remElements.forEach((el) => {
      el.textContent = `${remaining} Slots Left`;
    });

    const kmecCountEl = document.getElementById('kmec-team-count');
    const ngitCountEl = document.getElementById('ngit-team-count');
    if (kmecCountEl) kmecCountEl.textContent = String(kmecCount);
    if (ngitCountEl) ngitCountEl.textContent = String(ngitCount);

    const progressFill = document.getElementById('slot-progress-fill');
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    renderTeamsDrawer(teams);
  }

  function renderTeamsDrawer(teams) {
    const list = document.getElementById('drawer-teams-list');
    if (!list) return;
    list.innerHTML = '';

    const filtered = teams.filter((t) => {
      const matchesFilter =
        activeRosterFilter === 'ALL' ||
        t.college === activeRosterFilter ||
        t.branch === activeRosterFilter;
      const q = rosterSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.leader.toLowerCase().includes(q) ||
        t.college.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'drawer-empty-state';
      empty.textContent = 'No squads match the current filter.';
      list.appendChild(empty);
      return;
    }

    filtered.forEach((t) => {
      const seedIdx = teams.indexOf(t) + 1;
      const item = document.createElement('div');
      item.className = 'registered-team-item';
      item.innerHTML = `
        <div class="reg-team-info">
          <strong>${t.name}</strong>
          <span>${t.college} • ${t.branch} • Lead: ${t.leader}</span>
        </div>
        <div class="reg-slot-badge">#${seedIdx}</div>
      `;
      list.appendChild(item);
    });
  }

  // Drawer open/close
  const drawer = document.getElementById('teams-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerTriggers = document.querySelectorAll('.open-teams-drawer');
  const drawerCloseBtn = document.getElementById('close-drawer-btn');
  const drawerFilterBtns = document.querySelectorAll('.drawer-filter-btn');
  const drawerSearchInput = document.getElementById('drawer-search-input');

  function openRosterDrawer(presetFilter) {
    if (!drawer) return;
    if (presetFilter) {
      activeRosterFilter = presetFilter;
      drawerFilterBtns.forEach((b) =>
        b.classList.toggle('active', b.getAttribute('data-roster-filter') === presetFilter)
      );
      renderTeamsDrawer(getSavedTeams());
    }
    drawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    playTone(450, 'sine', 0.05);
  }

  function closeRosterDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    playTone(380, 'sine', 0.05);
  }

  drawerTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preset = btn.getAttribute('data-filter-college');
      openRosterDrawer(preset || null);
    });
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeRosterDrawer);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeRosterDrawer);
  }

  drawerFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeRosterFilter = btn.getAttribute('data-roster-filter') || 'ALL';
      drawerFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      renderTeamsDrawer(getSavedTeams());
      playTone(500, 'sine', 0.04);
    });
  });

  if (drawerSearchInput) {
    drawerSearchInput.addEventListener('input', () => {
      rosterSearchQuery = drawerSearchInput.value;
      renderTeamsDrawer(getSavedTeams());
    });
  }

  // --- INTERACTIVE ELIGIBILITY CHECKER + PRE-FILL ---
  const eligState = { college: 'KMEC', branch: 'CSE', year: 'II Year' };
  const eligStatusText = document.getElementById('elig-status-text');
  const eligApplyBtn = document.getElementById('elig-apply-btn');

  function updateEligReadout() {
    if (!eligStatusText) return;
    const shortYr = eligState.year.replace(' Year', '');
    eligStatusText.innerHTML = `Eligible: ${eligState.college} • ${eligState.branch} • Yr ${shortYr} — Apply &rarr;`;
  }

  document.querySelectorAll('.elig-pill-row').forEach((row) => {
    const group = row.getAttribute('data-elig-group');
    row.querySelectorAll('.elig-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        row.querySelectorAll('.elig-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        eligState[group] = chip.getAttribute('data-val');
        updateEligReadout();
        playTone(540, 'triangle', 0.04, 0.035);
      });
    });
  });

  if (eligApplyBtn) {
    eligApplyBtn.addEventListener('click', () => {
      // Pre-select College in Step 1
      const collegeRadio = document.querySelector(`input[name="team_college"][value="${eligState.college}"]`);
      if (collegeRadio) {
        collegeRadio.checked = true;
        collegeRadio.dispatchEvent(new Event('change'));
      }
      // Pre-select Branch & Year in Step 2
      const branchSelect = document.getElementById('leader_branch');
      const yearSelect = document.getElementById('leader_year');
      if (branchSelect) branchSelect.value = eligState.branch;
      if (yearSelect) yearSelect.value = eligState.year;

      const regSec = document.getElementById('register');
      if (regSec) regSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const teamInput = document.getElementById('team_name');
        if (teamInput) teamInput.focus({ preventScroll: true });
      }, 650);

      showToast(`Pre-configured squad profile: ${eligState.college} • ${eligState.branch} (${eligState.year})`);
    });
  }

  // --- TOURNAMENT BRACKET TABS + SLIDING GLIDER + LIVE TELEMETRY ---
  const bracketTabsBar = document.getElementById('bracket-tabs-bar');
  const bracketGlider = document.getElementById('bracket-tab-glider');
  const bracketTabs = document.querySelectorAll('.bracket-tab-btn');
  const bracketViews = document.querySelectorAll('.bracket-round-view');
  const telemetryLabel = document.getElementById('telemetry-match-label');
  const telemetryLatA = document.getElementById('telemetry-lat-a');
  const telemetryLatB = document.getElementById('telemetry-lat-b');
  const telemetryCtrlVal = document.getElementById('telemetry-ctrl-val');
  const telemetryBarFill = document.getElementById('telemetry-bar-fill');
  const telemetrySimBtn = document.getElementById('telemetry-sim-btn');
  let selectedMatchCard = document.querySelector('.match-card.selected-match') || document.querySelector('.match-card');

  function syncBracketGlider() {
    const activeTab = document.querySelector('.bracket-tab-btn.active');
    moveClayGlider(bracketGlider, activeTab, bracketTabsBar);
  }

  function updateMatchTelemetry(card) {
    if (!card) return;
    document.querySelectorAll('.match-card').forEach((c) => c.classList.remove('selected-match'));
    card.classList.add('selected-match');
    selectedMatchCard = card;

    const teamA = card.getAttribute('data-team-a') || 'Squad A';
    const teamB = card.getAttribute('data-team-b') || 'Squad B';
    const latA = card.getAttribute('data-lat-a') || '35ms';
    const latB = card.getAttribute('data-lat-b') || '48ms';
    const ctrl = card.getAttribute('data-ctrl') || '60';

    if (telemetryLabel) telemetryLabel.textContent = `${teamA} vs ${teamB} • Engine Telemetry`;
    if (telemetryLatA) telemetryLatA.textContent = latA;
    if (telemetryLatB) telemetryLatB.textContent = latB;
    if (telemetryCtrlVal) telemetryCtrlVal.textContent = `${ctrl}%`;
    if (telemetryBarFill) telemetryBarFill.style.width = `${ctrl}%`;
  }

  document.querySelectorAll('.match-card').forEach((card) => {
    card.addEventListener('click', () => {
      updateMatchTelemetry(card);
      playTone(550, 'triangle', 0.05, 0.04);
    });
  });

  if (telemetrySimBtn) {
    telemetrySimBtn.addEventListener('click', () => {
      const baseCtrl = parseInt(selectedMatchCard?.getAttribute('data-ctrl') || '60', 10);
      let ticks = 0;
      telemetrySimBtn.disabled = true;
      telemetrySimBtn.textContent = 'Simulating...';

      const simInterval = setInterval(() => {
        ticks += 1;
        const jitterCtrl = Math.min(84, Math.max(46, baseCtrl + Math.floor((Math.random() - 0.42) * 18)));
        const randA = 22 + Math.floor(Math.random() * 22);
        const randB = 31 + Math.floor(Math.random() * 28);
        if (telemetryLatA) telemetryLatA.textContent = `${randA}ms`;
        if (telemetryLatB) telemetryLatB.textContent = `${randB}ms`;
        if (telemetryCtrlVal) telemetryCtrlVal.textContent = `${jitterCtrl}%`;
        if (telemetryBarFill) telemetryBarFill.style.width = `${jitterCtrl}%`;
        playTone(460 + ticks * 35, 'sine', 0.03, 0.025);

        if (ticks >= 5) {
          clearInterval(simInterval);
          telemetrySimBtn.disabled = false;
          telemetrySimBtn.textContent = 'Simulate Tick';
          updateMatchTelemetry(selectedMatchCard);
        }
      }, 150);
    });
  }

  bracketTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetRound = tab.getAttribute('data-round');
      bracketTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      syncBracketGlider();
      playTone(520, 'sine', 0.04);

      bracketViews.forEach((view) => {
        if (view.getAttribute('data-round-view') === targetRound) {
          view.classList.add('active');
          const firstCard = view.querySelector('.match-card');
          if (firstCard) updateMatchTelemetry(firstCard);
        } else {
          view.classList.remove('active');
        }
      });
    });
  });
  requestAnimationFrame(syncBracketGlider);

  // --- FAQS ACCORDION ---
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('active');
      const content = item.querySelector('.accordion-content');

      document.querySelectorAll('.accordion-item').forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        playTone(500, 'sine', 0.04);
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
        playTone(380, 'sine', 0.04);
      }
    });
  });

  // --- MULTI-STEP REGISTRATION FORM WIZARD ---
  let currentStep = 1;
  const totalSteps = 4;
  const form = document.getElementById('tournament-reg-form');
  const stepPanels = document.querySelectorAll('.step-panel');
  const wizardSteps = document.querySelectorAll('.wizard-step-item');
  const wizardProgressFill = document.getElementById('wizard-progress-fill');
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const submitBtn = document.getElementById('wizard-submit-btn');

  // Clear validation errors immediately on input
  if (form) {
    form.querySelectorAll('.form-input, .form-select, input[type="checkbox"], input[type="radio"]').forEach((field) => {
      field.addEventListener('input', () => {
        const fg = field.closest('.form-group');
        if (fg) fg.classList.remove('has-error', 'shake-error');
      });
      field.addEventListener('change', () => {
        const fg = field.closest('.form-group');
        if (fg) fg.classList.remove('has-error', 'shake-error');
      });
    });
  }

  // Team Size Selection (3 or 4)
  const teamSizeInputs = document.querySelectorAll('input[name="team_size"]');
  const member4Block = document.getElementById('member-4-block');

  teamSizeInputs.forEach((radio) => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.choice-card-label').forEach((label) => {
        if (label.querySelector('input[name="team_size"]')) {
          label.classList.toggle('selected', label.querySelector('input[name="team_size"]').checked);
        }
      });

      if (radio.value === '4') {
        member4Block.style.display = 'block';
        member4Block.style.animation = 'fadeIn 300ms ease';
      } else {
        member4Block.style.display = 'none';
      }
      playTone(450, 'sine', 0.03);
    });
  });

  // College Card Selection Radio highlight
  const collegeInputs = document.querySelectorAll('input[name="team_college"]');
  collegeInputs.forEach((radio) => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.choice-card-label').forEach((label) => {
        if (label.querySelector('input[name="team_college"]')) {
          label.classList.toggle('selected', label.querySelector('input[name="team_college"]').checked);
        }
      });
      playTone(450, 'sine', 0.03);
    });
  });

  function validateStep(step) {
    let isValid = true;
    const currentPanel = document.querySelector(`.step-panel[data-step="${step}"]`);
    if (!currentPanel) return true;

    currentPanel.querySelectorAll('.form-group').forEach((fg) => fg.classList.remove('has-error'));

    if (step === 1) {
      const teamName = document.getElementById('team_name');
      if (!teamName.value.trim() || teamName.value.trim().length < 3) {
        teamName.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      const collegeChecked = document.querySelector('input[name="team_college"]:checked');
      if (!collegeChecked) {
        document.getElementById('college-group').classList.add('has-error');
        isValid = false;
      }
    } else if (step === 2) {
      const leadName = document.getElementById('leader_name');
      const leadRoll = document.getElementById('leader_roll');
      const leadEmail = document.getElementById('leader_email');
      const leadPhone = document.getElementById('leader_phone');

      if (!leadName.value.trim()) {
        leadName.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      if (!leadRoll.value.trim()) {
        leadRoll.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(leadEmail.value.trim())) {
        leadEmail.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      if (!leadPhone.value.trim() || leadPhone.value.trim().length < 10) {
        leadPhone.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
    } else if (step === 3) {
      const m2Name = document.getElementById('m2_name');
      const m2Roll = document.getElementById('m2_roll');
      const m3Name = document.getElementById('m3_name');
      const m3Roll = document.getElementById('m3_roll');

      if (!m2Name.value.trim()) {
        m2Name.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      if (!m2Roll.value.trim()) {
        m2Roll.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      if (!m3Name.value.trim()) {
        m3Name.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      if (!m3Roll.value.trim()) {
        m3Roll.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      const selectedSize = document.querySelector('input[name="team_size"]:checked').value;
      if (selectedSize === '4') {
        const m4Name = document.getElementById('m4_name');
        const m4Roll = document.getElementById('m4_roll');
        if (!m4Name.value.trim()) {
          m4Name.closest('.form-group').classList.add('has-error');
          isValid = false;
        }
        if (!m4Roll.value.trim()) {
          m4Roll.closest('.form-group').classList.add('has-error');
          isValid = false;
        }
      }
    } else if (step === 4) {
      const rulesCheck = document.getElementById('agree_rules');
      if (!rulesCheck.checked) {
        rulesCheck.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
    }

    if (!isValid) {
      currentPanel.querySelectorAll('.form-group.has-error').forEach((fg) => {
        fg.classList.remove('shake-error');
        void fg.offsetWidth;
        fg.classList.add('shake-error');
      });
      playTone(280, 'sawtooth', 0.12, 0.05);
      showToast('Please fill in all required fields accurately.');
    }
    return isValid;
  }

  function renderReviewSummary() {
    const teamName = document.getElementById('team_name').value.trim();
    const college = document.querySelector('input[name="team_college"]:checked')?.value || 'KMEC';
    const size = document.querySelector('input[name="team_size"]:checked')?.value || '3';
    const leaderName = document.getElementById('leader_name').value.trim();
    const leaderRoll = document.getElementById('leader_roll').value.trim();
    const leaderBranch = document.getElementById('leader_branch').value;
    const leaderYear = document.getElementById('leader_year').value;

    const m2Name = document.getElementById('m2_name').value.trim();
    const m3Name = document.getElementById('m3_name').value.trim();
    const m4Name = document.getElementById('m4_name')?.value.trim();

    let membersList = `${leaderName} (Lead), ${m2Name}, ${m3Name}`;
    if (size === '4' && m4Name) {
      membersList += `, ${m4Name}`;
    }

    const container = document.getElementById('review-summary-content');
    if (!container) return;

    container.innerHTML = `
      <div class="review-summary-row">
        <span class="review-summary-label">Team Name</span>
        <span class="review-summary-val text-cyan">${teamName}</span>
      </div>
      <div class="review-summary-row">
        <span class="review-summary-label">Institution</span>
        <span class="review-summary-val">${college === 'KMEC' ? 'KMEC (Keshav Memorial)' : 'NGIT (Neil Gogte)'}</span>
      </div>
      <div class="review-summary-row">
        <span class="review-summary-label">Team Size</span>
        <span class="review-summary-val">${size} Members</span>
      </div>
      <div class="review-summary-row">
        <span class="review-summary-label">Team Leader</span>
        <span class="review-summary-val">${leaderName} (${leaderRoll} • ${leaderBranch} • ${leaderYear})</span>
      </div>
      <div class="review-summary-row">
        <span class="review-summary-label">Roster</span>
        <span class="review-summary-val">${membersList}</span>
      </div>
      <div class="review-summary-row">
        <span class="review-summary-label">Tournament Date</span>
        <span class="review-summary-val">21 November 2026 (09:30 AM)</span>
      </div>
    `;
  }

  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    const goingBack = step < currentStep;

    stepPanels.forEach((p) => p.classList.remove('active', 'step-back-anim'));
    wizardSteps.forEach((s, idx) => {
      const stepIdx = idx + 1;
      s.classList.remove('active');
      if (stepIdx < step) {
        s.classList.add('completed');
      } else {
        s.classList.remove('completed');
      }
    });

    const activePanel = document.querySelector(`.step-panel[data-step="${step}"]`);
    const activeWizardStep = document.querySelector(`.wizard-step-item[data-step="${step}"]`);

    if (activePanel) {
      if (goingBack) activePanel.classList.add('step-back-anim');
      activePanel.classList.add('active');
    }
    if (activeWizardStep) activeWizardStep.classList.add('active');
    if (wizardProgressFill) {
      wizardProgressFill.style.width = `${(step / totalSteps) * 100}%`;
    }

    if (step === 1) {
      prevBtn.style.visibility = 'hidden';
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    } else if (step === totalSteps) {
      prevBtn.style.visibility = 'visible';
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
      renderReviewSummary();
    } else {
      prevBtn.style.visibility = 'visible';
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }

    currentStep = step;
    playTone(460, 'sine', 0.04);
  }

  // Allow clicking completed wizard steps to jump back directly
  wizardSteps.forEach((stepItem) => {
    stepItem.addEventListener('click', () => {
      const targetStep = parseInt(stepItem.getAttribute('data-step'), 10);
      if (targetStep && targetStep < currentStep) {
        goToStep(targetStep);
      }
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  }

  // --- SUBMISSION & DIGITAL TICKET GENERATION ---
  function drawMinimalQRCode(canvasElem, text) {
    const ctx = canvasElem.getContext('2d');
    const size = 120;
    canvasElem.width = size;
    canvasElem.height = size;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    const grid = 15;
    const cellSize = size / grid;

    ctx.fillStyle = '#062341';

    function drawFinder(r, c) {
      ctx.fillRect(c * cellSize, r * cellSize, 4 * cellSize, 4 * cellSize);
      ctx.clearRect((c + 0.8) * cellSize, (r + 0.8) * cellSize, 2.4 * cellSize, 2.4 * cellSize);
      ctx.fillRect((c + 1.4) * cellSize, (r + 1.4) * cellSize, 1.2 * cellSize, 1.2 * cellSize);
    }
    drawFinder(1, 1);
    drawFinder(1, grid - 5);
    drawFinder(grid - 5, 1);

    let seed = Math.abs(hash);
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if ((r < 6 && c < 6) || (r < 6 && c > grid - 7) || (r > grid - 7 && c < 6)) continue;
        seed = (seed * 9301 + 49297) % 233280;
        if (seed % 3 === 0) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep(4)) return;

      const teamName = document.getElementById('team_name').value.trim();
      const college = document.querySelector('input[name="team_college"]:checked').value;
      const size = document.querySelector('input[name="team_size"]:checked').value;
      const leaderName = document.getElementById('leader_name').value.trim();
      const leaderRoll = document.getElementById('leader_roll').value.trim();
      const leaderBranch = document.getElementById('leader_branch').value;
      const leaderYear = document.getElementById('leader_year').value;

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const regId = `CL26-${college}-${randomSuffix}`;

      // Save to localStorage
      const teams = getSavedTeams();
      const newTeam = {
        id: regId,
        name: teamName,
        college: college,
        branch: leaderBranch,
        members: parseInt(size, 10),
        leader: leaderName,
        registeredAt: new Date().toISOString()
      };
      teams.push(newTeam);
      localStorage.setItem('cl26_teams', JSON.stringify(teams));
      updateSlotCounters();

      // Populate Ticket Modal
      document.getElementById('ticket-team-name').textContent = teamName;
      document.getElementById('ticket-reg-id').textContent = regId;
      document.getElementById('ticket-college').textContent = `${college} • ${leaderBranch} • ${leaderYear}`;
      document.getElementById('ticket-leader').textContent = `${leaderName} (${leaderRoll})`;
      document.getElementById('ticket-members-count').textContent = `${size} Members`;

      const qrCanvas = document.getElementById('ticket-qr-canvas');
      if (qrCanvas) {
        drawMinimalQRCode(qrCanvas, `${regId}:${teamName}:${college}`);
      }

      // Open Modal
      const modal = document.getElementById('ticket-modal');
      modal.classList.add('active');
      playSuccessChime();
      launchClayConfetti(window.innerWidth / 2, window.innerHeight * 0.38, 90);
      showToast(`Squad Registered! Pass ID: ${regId}`);

      form.reset();
      // Restore visual radio states after form.reset()
      document.querySelectorAll('.choice-card-label').forEach((label) => {
        const r = label.querySelector('input[type="radio"]');
        if (r) label.classList.toggle('selected', r.checked);
      });
      if (member4Block) member4Block.style.display = 'none';
      goToStep(1);
    });
  }

  // Close Ticket Modal
  const modalCloseBtn = document.getElementById('close-ticket-modal');
  const ticketModal = document.getElementById('ticket-modal');
  if (modalCloseBtn && ticketModal) {
    modalCloseBtn.addEventListener('click', () => {
      ticketModal.classList.remove('active');
      playTone(380, 'sine', 0.04);
    });

    ticketModal.addEventListener('click', (e) => {
      if (e.target === ticketModal) {
        ticketModal.classList.remove('active');
      }
    });
  }

  // Print/Download Pass
  const printPassBtn = document.getElementById('print-ticket-btn');
  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => {
      playTone(520, 'sine', 0.04);
      window.print();
    });
  }

  // Copy Ticket ID
  const copyIdBtn = document.getElementById('copy-ticket-id-btn');
  if (copyIdBtn) {
    copyIdBtn.addEventListener('click', () => {
      const regId = document.getElementById('ticket-reg-id').textContent;
      navigator.clipboard.writeText(regId).then(() => {
        showToast(`Pass ID ${regId} copied to clipboard!`);
      });
    });
  }

  // Global Escape Key Handler for Modal & Drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (ticketModal && ticketModal.classList.contains('active')) {
        ticketModal.classList.remove('active');
      }
      if (drawer && drawer.classList.contains('open')) {
        closeRosterDrawer();
      }
      document.body.classList.remove('mobile-nav-active');
    }
  });

  // Initial slot counter sync
  updateSlotCounters();
});
