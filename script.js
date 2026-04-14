/* ============================================
   DEEPAK KUMAR PATEL PORTFOLIO — script.js
   ============================================ */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ===== PARTICLE SYSTEM =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  const colors = ['#a78bfa', '#06b6d4', '#818cf8', '#c4b5fd'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * -15}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== SCROLL REVEAL =====
function addRevealClasses() {
  const targets = [
    '.about-text', '.about-edu',
    '.skill-category', '.proficiency-section',
    '.project-card',
    '.achievement-card', '.stats-banner',
    '.contact-info', '.contact-form-wrap',
    '.section-header'
  ];
  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });
}
addRevealClasses();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PROFICIENCY BARS ANIMATION =====
const profFills = document.querySelectorAll('.prof-fill');
const profObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = `${width}%`;
        profObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);
profFills.forEach(fill => profObserver.observe(fill));

// ===== CGPA BAR ANIMATION =====
const cgpaObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.cgpa-fill');
        if (fill) {
          const w = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => { fill.style.width = w; }, 200);
        }
        cgpaObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.edu-card').forEach(card => cgpaObserver.observe(card));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#a78bfa';
    }
  });
}, { passive: true });

// ===== SMOOTH HOVER TILT on project cards =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y     = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('contact-name').value;
  const email   = document.getElementById('contact-email-input').value;
  const message = document.getElementById('contact-message').value;

  const mailtoBody = encodeURIComponent(
    `Hi Deepak,\n\nMy name is ${name} (${email}).\n\n${message}`
  );
  const mailtoUrl = `mailto:deepak.2201109cs@iiitbh.ac.in?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${mailtoBody}`;

  window.location.href = mailtoUrl;

  const successEl = document.getElementById('form-success');
  successEl.style.display = 'block';
  setTimeout(() => { successEl.style.display = 'none'; }, 5000);
}

// ===== TYPED TEXT EFFECT in hero =====
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  const originalText = subtitleEl.innerHTML;
  // Subtle shimmer on load
  subtitleEl.style.animation = 'fadeInUp 0.8s ease 0.3s both';
}

// ===== COUNTER ANIMATION for stats =====
function animateCounter(el, target, duration = 1500) {
  const isDecimal = String(target).includes('.');
  const decimals  = isDecimal ? 2 : 0;
  const start     = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = start + (target - start) * eased;
    el.textContent = isDecimal ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.banner-num');
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text  = entry.target.textContent.replace(/,/g, '');
        const value = parseFloat(text);
        if (!isNaN(value)) animateCounter(entry.target, value);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
statNums.forEach(el => statObserver.observe(el));

// Also animate hero stats
document.querySelectorAll('.stat-num').forEach(el => {
  const heroStatsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const text  = entry.target.textContent.replace(/\+/g, '').replace(/,/g, '');
          const value = parseFloat(text);
          const hasPlus = entry.target.textContent.includes('+');
          if (!isNaN(value)) {
            animateCounter(entry.target, value);
            if (hasPlus) {
              setTimeout(() => {
                entry.target.textContent += '+';
              }, 1520);
            }
          }
          heroStatsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  heroStatsObserver.observe(el);
});
