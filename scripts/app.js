/**
 * CHAMPIONS LEAGUE 2026 - Interactive Application Logic
 * KMEC × NGIT Inter-College Strategy Tournament
 * Learn • Build • Compete with AI
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // --- HORIZONTAL SIDE-SCROLLING 5 TABS CONTROLS ---
  const tabsTrack = document.getElementById('horizontal-tabs-track');
  const scrollPrevBtn = document.getElementById('scroll-prev-btn');
  const scrollNextBtn = document.getElementById('scroll-next-btn');

  if (tabsTrack && scrollPrevBtn && scrollNextBtn) {
    scrollPrevBtn.addEventListener('click', () => {
      tabsTrack.scrollBy({ left: -460, behavior: 'smooth' });
      playTone(450, 'sine', 0.04);
    });

    scrollNextBtn.addEventListener('click', () => {
      tabsTrack.scrollBy({ left: 460, behavior: 'smooth' });
      playTone(490, 'sine', 0.04);
    });

    // Mouse drag-to-scroll support for desktop
    let isDown = false;
    let startX = 0;
    let scrollLeftPos = 0;

    tabsTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      tabsTrack.style.cursor = 'grabbing';
      startX = e.pageX - tabsTrack.offsetLeft;
      scrollLeftPos = tabsTrack.scrollLeft;
    });

    tabsTrack.addEventListener('mouseleave', () => {
      isDown = false;
      tabsTrack.style.cursor = 'default';
    });

    tabsTrack.addEventListener('mouseup', () => {
      isDown = false;
      tabsTrack.style.cursor = 'default';
    });

    tabsTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tabsTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      tabsTrack.scrollLeft = scrollLeftPos - walk;
    });
  }

  // --- SOUND EFFECTS (Web Audio API) ---
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
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
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

  // --- PARTICLE BACKGROUND CANVAS (CLEAN GRADIENT AURA, NO GRID) ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 60);

    let mouse = { x: -1000, y: -1000, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.35 ? '#32BEDF' : '#1C8392';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.shadowColor = '#32BEDF';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(50, 190, 223, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- COUNTDOWN TIMER ---
  // Event Date: 21 November 2026, 09:30:00 IST
  const eventDate = new Date('2026-11-21T09:30:00+05:30').getTime();
  const dElem = document.getElementById('count-days');
  const hElem = document.getElementById('count-hours');
  const mElem = document.getElementById('count-mins');
  const sElem = document.getElementById('count-secs');

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
      if (dElem) dElem.textContent = '00';
      if (hElem) hElem.textContent = '00';
      if (mElem) mElem.textContent = '00';
      if (sElem) sElem.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (dElem) dElem.textContent = String(days).padStart(2, '0');
    if (hElem) hElem.textContent = String(hours).padStart(2, '0');
    if (mElem) mElem.textContent = String(mins).padStart(2, '0');
    if (sElem) sElem.textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

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

    const slotElements = document.querySelectorAll('.slot-count-val');
    slotElements.forEach((el) => {
      el.textContent = `${count} / ${MAX_TEAMS}`;
    });

    const remElements = document.querySelectorAll('.slot-remaining-val');
    remElements.forEach((el) => {
      el.textContent = `${remaining} Slots Left`;
    });

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
    teams.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'registered-team-item';
      item.innerHTML = `
        <div class="reg-team-info">
          <strong>${t.name}</strong>
          <span>${t.college} • ${t.branch} • Lead: ${t.leader}</span>
        </div>
        <div class="reg-slot-badge">#${i + 1}</div>
      `;
      list.appendChild(item);
    });
  }

  // Drawer open/close
  const drawer = document.getElementById('teams-drawer');
  const drawerTriggers = document.querySelectorAll('.open-teams-drawer');
  const drawerCloseBtn = document.getElementById('close-drawer-btn');

  drawerTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      drawer.classList.add('open');
      playTone(450, 'sine', 0.05);
    });
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      playTone(380, 'sine', 0.05);
    });
  }

  // --- TOURNAMENT BRACKET TABS ---
  const bracketTabs = document.querySelectorAll('.bracket-tab-btn');
  const bracketViews = document.querySelectorAll('.bracket-round-view');

  bracketTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetRound = tab.getAttribute('data-round');
      bracketTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      playTone(520, 'sine', 0.04);

      bracketViews.forEach((view) => {
        if (view.getAttribute('data-round-view') === targetRound) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });

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
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const submitBtn = document.getElementById('wizard-submit-btn');

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

    stepPanels.forEach((p) => p.classList.remove('active'));
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

    if (activePanel) activePanel.classList.add('active');
    if (activeWizardStep) activeWizardStep.classList.add('active');

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
      document.getElementById('ticket-college').textContent = `${college} • ${leaderBranch} • Year ${leaderYear}`;
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
      showToast(`🎉 Squad Registered! Pass ID: ${regId}`);

      form.reset();
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

  // Initial slot counter sync
  updateSlotCounters();
});
