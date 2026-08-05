// =========================================
// SHIVAM CHAUHAN — PORTFOLIO SCRIPT ENGINE
// =========================================

// 1. THIRD-PARTY INITIALIZATIONS WITH DEFENSIVE GUARDS
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
}


// 2. THEME & GENERAL UTILITIES
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// 3. UI ANIMATIONS & MOUSE INTERACTIONS

// Magnetic buttons
document.querySelectorAll('.btn.magnetic').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    if (typeof gsap === 'undefined') return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    if (typeof gsap === 'undefined') return;
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  });
});

// Smooth scroll for general anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (
      this.closest('.hero-actions') || 
      this.closest('.split-nav-bottom-row') || 
      this.closest('#hero-style-simple') || 
      this.closest('.split-right-panel') || 
      document.body.classList.contains('split-mode-active')
    ) {
      return; // Handled by split-screen navigation
    }
    const href = this.getAttribute('href');
    if (!href || href === '#' || href.length <= 1) return;
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (typeof gsap !== 'undefined') {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: target,
              offsetY: 70
            },
            ease: 'power3.inOut'
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (err) {
      // Ignore invalid selectors
    }
  });
});

// Floating background particles
function createParticles() {
  if (typeof gsap === 'undefined') return;
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 6 : 14;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.pointerEvents = 'none';
    document.body.appendChild(particle);

    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5
    });

    gsap.to(particle, {
      y: '-=80',
      x: '+=40',
      duration: Math.random() * 3 + 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 2
    });
  }
}
createParticles();

// Cursor trail effect disabled as requested
/* Cursor trail removed */

// Project cards 3D tilt & hover
document.querySelectorAll('.card.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (typeof gsap === 'undefined') return;
    gsap.to(card, {
      y: -12,
      rotateX: 5,
      boxShadow: '0 20px 60px rgba(106, 167, 255, 0.3)',
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    if (typeof gsap === 'undefined') return;
    gsap.to(card, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mousemove', (e) => {
    if (typeof gsap === 'undefined') return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  });
});

// Social buttons hover
document.querySelectorAll('.social-btn, .footer-social-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'back.out(1.7)' });
    }
  });
  btn.addEventListener('mouseleave', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  });
});

// Form field focus effects
document.querySelectorAll('.form input, .form textarea').forEach(field => {
  field.addEventListener('focus', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(field, { scale: 1.02, duration: 0.3, ease: 'back.out(1.7)' });
    }
  });
  field.addEventListener('blur', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(field, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  });
});

// Learning Path Infinite Marquee
const learningContainer = document.querySelector('.learning-path-container');
if (learningContainer && typeof gsap !== 'undefined') {
  const steps = Array.from(learningContainer.children);
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.gap = '32px';
  wrapper.style.width = 'max-content';

  steps.forEach(step => wrapper.appendChild(step));
  steps.forEach(step => wrapper.appendChild(step.cloneNode(true)));

  learningContainer.innerHTML = '';
  learningContainer.appendChild(wrapper);

  const singleSetWidth = wrapper.scrollWidth / 2 || ((300 + 32) * steps.length);

  const marqueeTimeline = gsap.to(wrapper, {
    x: -singleSetWidth,
    duration: 30,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % singleSetWidth)
    }
  });

  learningContainer.addEventListener('mouseenter', () => marqueeTimeline.pause());
  learningContainer.addEventListener('mouseleave', () => marqueeTimeline.play());
  learningContainer.addEventListener('focusin', () => marqueeTimeline.pause());
  learningContainer.addEventListener('focusout', () => marqueeTimeline.play());

  gsap.set(learningContainer, { opacity: 1, x: 0 });
}

// Hero Email Interaction
const heroEmail = document.querySelector('.hero-email-display');
if (heroEmail) {
  const originalText = heroEmail.textContent;
  const threshold = window.innerHeight * 0.5;
  let isRetracted = false;

  if (window.scrollY > threshold) {
    heroEmail.classList.add('retract');
    isRetracted = true;
  }
  window.addEventListener('scroll', () => {
    const shouldRetract = window.scrollY > threshold;
    if (shouldRetract !== isRetracted) {
      isRetracted = shouldRetract;
      heroEmail.classList.toggle('retract', isRetracted);
    }
  }, { passive: true });

  heroEmail.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(originalText).then(() => {
        heroEmail.classList.add('copy-success');
        heroEmail.textContent = "Copied!";

        setTimeout(() => {
          heroEmail.classList.remove('copy-success');
          heroEmail.textContent = originalText;
        }, 2000);
      }).catch(() => {});
    }
  });
}

// Placeholder link toast logic
document.querySelectorAll('.project-card .btn, .case-studies-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (
      btn.closest('.notebook-vault-card') || 
      btn.classList.contains('open-notebook-btn') || 
      btn.id === 'open-notebook-btn-card' || 
      btn.id === 'open-case-studies-btn-card' || 
      btn.classList.contains('case-studies-btn')
    ) {
      return;
    }
    const href = btn.getAttribute('href');
    if (href && href !== '#' && href.trim() !== '') {
      return;
    }
    e.preventDefault();
    const isLive = btn.textContent.trim() === 'Live';
    const msg = isLive ? '🚀 Live Demo coming soon!' : '🔒 Repository is currently private.';

    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px;
      background: rgba(11, 12, 15, 0.9); border: 1px solid var(--accent);
      color: #fff; padding: 12px 24px; border-radius: 8px;
      z-index: 10001; animation: fadeInUp 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  });
});


// 4. HERO CANVAS PARTICLE NETWORK
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animFrameId = null;
  let isVisible = true;

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 22 : 45;
  const connectionDistance = isMobile ? 110 : 140;
  const connDistSq = connectionDistance * connectionDistance;
  const mouseDistance = 200;
  const mouseDistSq = mouseDistance * mouseDistance;
  const mouse = { x: null, y: null };

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', (e) => {
    if (!isVisible) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  function getThemeColors() {
    const isLight = document.body.classList.contains('light-theme');
    return {
      particle: isLight ? 'rgba(37, 99, 235, ' : 'rgba(106, 167, 255, ',
      line: isLight ? 'rgba(37, 99, 235, ' : 'rgba(106, 167, 255, ',
      connection: isLight ? 'rgba(71, 85, 105, ' : 'rgba(255, 255, 255, '
    };
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw(colors) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = colors.particle + '0.7)';
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);
    const colors = getThemeColors();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(colors);

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distSq = dx * dx + dy * dy;

        if (distSq < connDistSq) {
          let distance = Math.sqrt(distSq);
          ctx.beginPath();
          let opacity = 1 - (distance / connectionDistance);
          ctx.strokeStyle = colors.line + (opacity * 0.2) + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      if (mouse.x != null) {
        let dx = particles[i].x - mouse.x;
        let dy = particles[i].y - mouse.y;
        let distSq = dx * dx + dy * dy;

        if (distSq < mouseDistSq) {
          let distance = Math.sqrt(distSq);
          ctx.beginPath();
          let opacity = 1 - (distance / mouseDistance);
          ctx.strokeStyle = colors.connection + (opacity * 0.5) + ')';
          ctx.lineWidth = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    animFrameId = requestAnimationFrame(animate);
  }

  init();

  // Pause canvas animation loop when hero section is not visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animFrameId) {
            animFrameId = requestAnimationFrame(animate);
          }
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  } else {
    animate();
  }
})();


// 5. SPLIT-SCREEN NAVIGATION SYSTEM
(function initSplitScreenNav() {
  const heroNavLinks = document.querySelectorAll('.hero-actions a[href^="#"]');
  const bottomNavLinks = document.querySelectorAll('.split-nav-bottom-row a[href^="#"]');
  const splitPanel = document.getElementById('split-right-panel');
  const panelTitle = document.getElementById('split-panel-title');
  const panelBody = document.getElementById('split-panel-body');
  const closeBtn = document.getElementById('split-panel-close');
  const homeBtn = document.getElementById('btn-home');
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const heroActions = document.querySelector('.hero-actions');

  if (mobileMenuBtn && heroActions) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = heroActions.classList.toggle('menu-open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (!heroActions.contains(e.target)) {
        heroActions.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    heroNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        heroActions.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (!splitPanel) return;

  function closeSplitMode() {
    document.body.classList.remove('split-mode-active');
    splitPanel.setAttribute('aria-hidden', 'true');
    splitPanel.setAttribute('inert', '');
    heroNavLinks.forEach(b => b.classList.remove('active-split-nav'));
    bottomNavLinks.forEach(b => b.classList.remove('active-split-nav'));
  }

  function openSectionInSplit(targetId) {
    if (targetId === '#home') {
      closeSplitMode();
      return;
    }

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    const heroSection = document.getElementById('hero-style-simple');
    const prevHeroScroll = heroSection ? heroSection.scrollTop : 0;

    heroNavLinks.forEach(b => {
      if (b.getAttribute('href') === targetId) {
        b.classList.add('active-split-nav');
      } else {
        b.classList.remove('active-split-nav');
      }
    });

    bottomNavLinks.forEach(b => {
      if (b.getAttribute('href') === targetId) {
        b.classList.add('active-split-nav');
      } else {
        b.classList.remove('active-split-nav');
      }
    });

    document.body.classList.add('split-mode-active');
    splitPanel.setAttribute('aria-hidden', 'false');
    splitPanel.removeAttribute('inert');

    if (heroSection) {
      heroSection.scrollTop = prevHeroScroll;
    }

    const activeLink = Array.from(heroNavLinks).find(b => b.getAttribute('href') === targetId);
    const sectionHeading = targetSection.querySelector('h2')?.textContent || activeLink?.textContent.trim() || 'Details';
    panelTitle.textContent = sectionHeading;

    const container = targetSection.querySelector('.container') || targetSection;
    
    // Clone node to avoid duplicate IDs in panel
    const clonedContainer = container.cloneNode(true);
    clonedContainer.querySelectorAll('[id]').forEach(el => {
      el.setAttribute('id', 'panel-' + el.id);
    });

    panelBody.innerHTML = clonedContainer.innerHTML;

    const innerTitle = panelBody.querySelector('h2');
    if (innerTitle) innerTitle.remove();

    panelBody.querySelectorAll('[data-aos], .about-glass-card, .timeline-item, .skill-card, .project-card, .coding-card, .learning-step, .contact-card, .card').forEach(el => {
      el.classList.add('aos-animate');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });

    panelBody.querySelectorAll('.progress-fill').forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        setTimeout(() => {
          bar.style.width = `${progress}%`;
        }, 50);
      }
    });

    panelBody.scrollTop = 0;

    const openVaultCard = panelBody.querySelector('#panel-open-notebook-card, #open-notebook-card, .notebook-vault-card:not(.case-studies-card)');
    if (openVaultCard) {
      openVaultCard.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof window.openNotebook === 'function') {
          window.openNotebook();
        } else {
          const notebookModal = document.getElementById('notebook-modal');
          if (notebookModal) {
            notebookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    }

    const openCaseCard = panelBody.querySelector('#panel-open-case-studies-card, #open-case-studies-card, .case-studies-card');
    if (openCaseCard) {
      openCaseCard.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof window.openCaseModal === 'function') {
          window.openCaseModal();
        } else {
          const caseModal = document.getElementById('case-studies-modal');
          if (caseModal) {
            caseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    }

    const panelForm = panelBody.querySelector('form');
    if (panelForm) {
      panelForm.addEventListener('submit', async (formEvt) => {
        formEvt.preventDefault();
        handleContactFormSubmit(panelForm);
      });
    }

    if (heroSection) {
      heroSection.scrollTop = prevHeroScroll;
    }
  }

  const allNavLinks = [...heroNavLinks, ...bottomNavLinks];
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === 'resume.pdf') return;

      e.preventDefault();
      e.stopPropagation();

      openSectionInSplit(targetId);
    });
  });

  closeBtn?.addEventListener('click', closeSplitMode);
  homeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeSplitMode();
  });

  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('split-mode-active')) return;

    if (e.target.closest('#case-studies-modal') || e.target.closest('#notebook-modal')) return;

    if (splitPanel && splitPanel.contains(e.target)) {
      return;
    }

    const clickedLink = e.target.closest('a, button, input, textarea');
    if (clickedLink) {
      const href = clickedLink.getAttribute('href');
      if (href && (href.startsWith('mailto:') || href.startsWith('tel:') || clickedLink.getAttribute('target') === '_blank')) {
        return;
      }
    }

    closeSplitMode();
  });

  const heroImgContainer = document.querySelector('.hero-image-container');
  if (heroImgContainer) {
    heroImgContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSplitMode();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const caseModal = document.getElementById('case-studies-modal');
      const notebookModal = document.getElementById('notebook-modal');
      if (caseModal && caseModal.classList.contains('active')) {
        if (typeof window.closeCaseModal === 'function') {
          window.closeCaseModal();
        }
      } else if (notebookModal && notebookModal.classList.contains('active')) {
        if (typeof window.closeNotebook === 'function') {
          window.closeNotebook();
        }
      } else if (document.body.classList.contains('split-mode-active')) {
        closeSplitMode();
      }
      document.querySelectorAll('.card-expanded').forEach(card => card.classList.remove('card-expanded'));
    }
  });

  document.addEventListener('click', (e) => {
    const card = e.target.closest('article.card, .project-card, .coding-card');
    if (card) {
      if (
        card.classList.contains('notebook-vault-card') || 
        card.classList.contains('case-studies-card') ||
        card.id === 'open-notebook-card' || 
        card.id === 'open-case-studies-card' ||
        card.id === 'panel-open-notebook-card' ||
        card.id === 'panel-open-case-studies-card'
      ) {
        return;
      }

      const linkOrBtn = e.target.closest('a, button, input, textarea');
      if (linkOrBtn) {
        return;
      }
      
      const isAlreadyExpanded = card.classList.contains('card-expanded');

      document.querySelectorAll('.card-expanded').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('card-expanded');
        }
      });

      if (isAlreadyExpanded) {
        card.classList.remove('card-expanded');
      } else {
        card.classList.add('card-expanded');
      }
    } else {
      document.querySelectorAll('.card-expanded').forEach(expandedCard => {
        expandedCard.classList.remove('card-expanded');
      });
    }
  });
})();


// 6. CONTACT FORM SUBMISSION ENGINE (EMAILJS INTEGRATION)
// EmailJS Setup Credentials:
// 1. Sign up / Log in at https://www.emailjs.com/
// 2. Add an Email Service (e.g. Gmail) -> Copy Service ID below.
// 3. Create an Email Template -> Copy Template ID below.
// 4. Go to Account > API Keys -> Copy Public Key (User ID) below.
const EMAILJS_PUBLIC_KEY = "sL8lyoAzaeyc3CpDm"; // Replace with your EmailJS Public Key
const SERVICE_ID = "service_jaswmq8";       // Replace with your EmailJS Service ID
const TEMPLATE_ID = "template_pvxfu89";     // Replace with your EmailJS Template ID

// Initialize EmailJS if public key is provided
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch (err) {
    console.warn('EmailJS init failed:', err);
  }
}

async function handleContactFormSubmit(targetForm) {
  if (!targetForm) return;

  const updateStatus = (text, color) => {
    const statusEl = targetForm.querySelector('.form-status') || targetForm.querySelector('[id*="form-status"]') || document.getElementById('form-status');
    if (statusEl) {
      statusEl.textContent = text;
      if (color) statusEl.style.color = color;
    }
  };

  const nameInput = targetForm.querySelector('input[name="name"], #name, #panel-name');
  const emailInput = targetForm.querySelector('input[name="email"], #email, #panel-email');
  const messageInput = targetForm.querySelector('textarea[name="message"], #message, #panel-message');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !message) {
    updateStatus('⚠ Please fill all fields (Name, Email, Message).', '#ff6b6b');

    if (typeof gsap !== 'undefined') {
      if (!name && nameInput) gsap.fromTo(nameInput, { x: -10 }, { x: 10, yoyo: true, repeat: 3, duration: 0.1 });
      if (!email && emailInput) gsap.fromTo(emailInput, { x: -10 }, { x: 10, yoyo: true, repeat: 3, duration: 0.1 });
      if (!message && messageInput) gsap.fromTo(messageInput, { x: -10 }, { x: 10, yoyo: true, repeat: 3, duration: 0.1 });
    }
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    updateStatus('⚠ Invalid Email Address. Please check again.', '#ff6b6b');
    if (typeof gsap !== 'undefined' && emailInput) {
      gsap.fromTo(emailInput, { x: -10 }, { x: 10, yoyo: true, repeat: 3, duration: 0.1 });
    }
    return;
  }

  const submitBtn = targetForm.querySelector('button[type="submit"]') || targetForm.querySelector('button') || targetForm.querySelector('.btn');

  if (submitBtn && typeof gsap !== 'undefined') {
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  }

  const originalText = submitBtn ? submitBtn.textContent : 'Send';
  if (submitBtn) {
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
  }

  const templateParams = {
    name: name,
    from_name: name,
    email: email,
    from_email: email,
    reply_to: email,
    message: message,
    to_email: 'xploreshivam@gmail.com',
    to_name: 'Shivam'
  };

  try {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      updateStatus('✓ Message sent successfully! I will get back to you soon.', '#22c55e');
      targetForm.reset();
    } else if (typeof emailjs !== 'undefined' && emailjs.send && SERVICE_ID && TEMPLATE_ID) {
      // Try sending directly with service & template ID if public key not initialized separately
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      updateStatus('✓ Message sent successfully! I will get back to you soon.', '#22c55e');
      targetForm.reset();
    } else {
      throw new Error('EmailJS Public Key is required to send messages via EmailJS.');
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    
    // Fallback: Open mailto link so message is never lost
    const mailtoUrl = `mailto:xploreshivam@gmail.com?subject=${encodeURIComponent('Portfolio Contact: ' + name)}&body=${encodeURIComponent(message + '\n\nSender: ' + name + ' (' + email + ')')}`;
    window.location.href = mailtoUrl;

    updateStatus('✓ Opening email client... (To enable direct EmailJS, add your Public Key in script.js)', '#6ab3ff');
    targetForm.reset();
  } finally {
    if (submitBtn) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
    setTimeout(() => {
      updateStatus('', '');
    }, 6000);
  }
}

const mainForm = document.getElementById('contact-form');
if (mainForm) {
  mainForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    handleContactFormSubmit(mainForm);
  });
}


// 7. DEVELOPER'S MINI PROJECTS VAULT SYSTEM
(function initMiniProjectsVault() {
  const MINI_PROJECTS = [
    {
      id: 'markdown-editor',
      title: 'Live Markdown Previewer',
      category: 'utility',
      categoryName: 'Utility',
      badgeClass: 'badge-utility',
      image: 'mini-markdown.svg',
      desc: 'Instant side-by-side markdown renderer with character count, syntax highlighting, and HTML export.',
      tags: ['JavaScript', 'RegEx', 'HTML5'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'glass-generator',
      title: 'Glassmorphism CSS Builder',
      category: 'utility',
      categoryName: 'Utility',
      badgeClass: 'badge-utility',
      image: 'mini-glass.svg',
      desc: 'Visual slider playground to tweak blur, opacity, shadow & reflection with 1-click Tailwind & CSS copy.',
      tags: ['CSS3', 'Backdrop-Filter', 'Design'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'pomodoro-timer',
      title: 'Pomodoro Focus Chime',
      category: 'utility',
      categoryName: 'Utility',
      badgeClass: 'badge-utility',
      image: 'mini-pomodoro.svg',
      desc: 'Minimalist productivity timer with 25m work / 5m break intervals, progress ring, and audio bell chime.',
      tags: ['Audio API', 'Canvas', 'State'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'pixel-art',
      title: 'Retro Pixel Canvas Pad',
      category: 'creative',
      categoryName: 'Creative',
      badgeClass: 'badge-creative',
      image: 'mini-pixel.svg',
      desc: '16x16 pixel art studio with color palette picker, eraser, undo, and instant PNG image download.',
      tags: ['HTML5 Canvas', 'Art', 'Export'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'color-harmony',
      title: 'Color Palette Harmony Picker',
      category: 'utility',
      categoryName: 'Utility',
      badgeClass: 'badge-utility',
      image: 'mini-palette.svg',
      desc: 'Generates complementary, triadic, and monochromatic color palettes with instant HEX & RGB copy.',
      tags: ['Color Math', 'Design', 'Clipboard'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'ascii-art',
      title: 'ASCII Text Banner Studio',
      category: 'utility',
      categoryName: 'Utility',
      badgeClass: 'badge-utility',
      image: 'mini-ascii.svg',
      desc: 'Converts standard text into stylized developer ASCII banners for terminal READMEs and headers.',
      tags: ['Text Processing', 'CLI', 'ASCII'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'speed-typing',
      title: '60s Developer Typing Test',
      category: 'creative',
      categoryName: 'Creative',
      badgeClass: 'badge-creative',
      image: 'mini-typing.svg',
      desc: 'Real-time WPM, accuracy, and error tracking challenge featuring real JavaScript & C code snippets.',
      tags: ['Event Listeners', 'Game', 'Stats'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    },
    {
      id: 'code-vault',
      title: 'Quick Code Snippet Bucket',
      category: 'utility',
      categoryName: 'Utility',
      badgeClass: 'badge-utility',
      image: 'mini-vault.svg',
      desc: 'Offline code snippet organizer with tag search, copy to clipboard, and instant snippet saver.',
      tags: ['LocalStorage', 'JSON', 'Search'],
      liveUrl: '#',
      codeUrl: 'https://github.com/xploreshivam'
    }
  ];

  const openCardBtn = document.getElementById('open-notebook-btn-card');
  const openCardContainer = document.getElementById('open-notebook-card');
  const notebookModal = document.getElementById('notebook-modal');
  const closeNotebookBtn = document.getElementById('close-notebook-btn');
  const galleryGrid = document.getElementById('mini-gallery-grid');

  let activeFilter = 'all';
  let searchQuery = '';

  const searchInput = document.getElementById('nb-search-input');
  const searchClearBtn = document.getElementById('nb-search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'inline-block' : 'none';
      }
      renderGallery();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      searchClearBtn.style.display = 'none';
      renderGallery();
    });
  }

  function openNotebook() {
    activeFilter = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (searchClearBtn) searchClearBtn.style.display = 'none';

    document.querySelectorAll('.nb-tab-btn').forEach(t => {
      if (t.getAttribute('data-filter') === 'all') {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    renderGallery();

    if (notebookModal) {
      notebookModal.classList.add('active');
      notebookModal.setAttribute('aria-hidden', 'false');
      notebookModal.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
    }

    document.querySelectorAll('.card-expanded').forEach(c => c.classList.remove('card-expanded'));
  }

  function closeNotebook() {
    if (notebookModal) {
      notebookModal.classList.remove('active');
      notebookModal.setAttribute('aria-hidden', 'true');
      notebookModal.setAttribute('inert', '');
      document.body.style.overflow = '';
    }
  }

  window.openNotebook = openNotebook;
  window.closeNotebook = closeNotebook;

  if (openCardBtn) openCardBtn.addEventListener('click', openNotebook);
  if (openCardContainer) {
    openCardContainer.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        openNotebook();
      }
    });
  }
  if (closeNotebookBtn) {
    closeNotebookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeNotebook();
    });
  }

  if (notebookModal) {
    notebookModal.addEventListener('click', (e) => {
      if (e.target === notebookModal) {
        e.preventDefault();
        closeNotebook();
      }
    });
  }

  document.querySelectorAll('.nb-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nb-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter') || 'all';
      renderGallery();
    });
  });

  function renderGallery() {
    if (!galleryGrid) return;
    const query = searchQuery.trim().toLowerCase();
    const items = MINI_PROJECTS.filter(p => {
      const matchesCat = activeFilter === 'all' || p.category === activeFilter;
      if (!matchesCat) return false;
      if (!query) return true;
      return p.title.toLowerCase().includes(query) ||
             p.desc.toLowerCase().includes(query) ||
             p.categoryName.toLowerCase().includes(query) ||
             p.tags.some(t => t.toLowerCase().includes(query));
    });

    if (items.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px 20px; color:var(--muted); width:100%;">
          <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
          <p>No mini projects found matching "<strong>${searchQuery || activeFilter}</strong>".</p>
        </div>
      `;
      return;
    }

    galleryGrid.innerHTML = items.map(p => {
      return `
      <div class="gallery-card" data-category="${p.category}">
        <a href="${p.liveUrl || '#'}" target="_blank" rel="noopener noreferrer" class="gallery-card-media" style="display:block; text-decoration:none;">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </a>
        <div class="gallery-card-body">
          <div class="gallery-card-meta">
            <div style="display:flex; justify-content:flex-start; align-items:center; width:100%; margin-bottom:6px;">
              <span class="badge ${p.badgeClass}" style="padding:2px 8px; border-radius:12px; font-size:0.75rem; background:rgba(255,255,255,0.08);">${p.categoryName}</span>
            </div>
            <h3 class="gallery-card-title">${p.title}</h3>
            <p class="gallery-card-desc">${p.desc}</p>
          </div>
          <div class="gallery-card-footer" style="margin-top: auto; width: 100%;">
            <a href="${p.liveUrl || '#'}" target="_blank" rel="noopener noreferrer" class="cs-read-btn gallery-demo-btn" style="width: 100%; justify-content: center;">
              Live ↗
            </a>
          </div>
        </div>
      </div>
    `;
    }).join('');
  }

  renderGallery();
})();


// 8. TECHNICAL CASE STUDIES VAULT SYSTEM
(function initCaseStudiesModal() {
  const CASE_STUDIES = [
    {
      id: 'cs-1',
      title: 'High-Scale Event-Driven Pipeline',
      category: 'architecture',
      categoryName: 'Architecture',
      summary: 'Redesigned a distributed ingestion framework using Kafka, Redis & Node.js, achieving sub-50ms latency.',
      readUrl: '#'
    },
    {
      id: 'cs-2',
      title: 'Zero-Downtime Multi-Region Database Migration',
      category: 'architecture',
      categoryName: 'Architecture',
      summary: 'Seamless live migration of 45M+ customer records from monolithic MySQL to distributed PostgreSQL cluster.',
      readUrl: '#'
    },
    {
      id: 'cs-3',
      title: 'AI Code Analysis & AST Indexing Engine',
      category: 'performance',
      categoryName: 'Performance & AI',
      summary: 'Built an AST-driven semantic search and LLM contextual indexing tool for enterprise code repositories.',
      readUrl: '#'
    },
    {
      id: 'cs-4',
      title: 'Design System & Performance Audit Framework',
      category: 'performance',
      categoryName: 'Performance & AI',
      summary: 'Engineered a lightweight, tokenized UI component framework with WCAG AAA accessibility & fluid CSS math.',
      readUrl: '#'
    }
  ];

  const openCaseBtn = document.getElementById('open-case-studies-btn-card');
  const openCaseContainer = document.getElementById('open-case-studies-card');
  const caseModal = document.getElementById('case-studies-modal');
  const closeCaseBtn = document.getElementById('close-case-studies-btn');
  const caseGalleryGrid = document.getElementById('case-studies-gallery-grid');

  const csSearchInput = document.getElementById('cs-search-input');
  const csSearchClearBtn = document.getElementById('cs-search-clear-btn');

  let activeCsFilter = 'all';
  let csSearchQuery = '';

  function openCaseModal() {
    activeCsFilter = 'all';
    csSearchQuery = '';
    if (csSearchInput) csSearchInput.value = '';
    if (csSearchClearBtn) csSearchClearBtn.style.display = 'none';

    document.querySelectorAll('.cs-tab-btn').forEach(t => {
      if (t.getAttribute('data-cs-filter') === 'all') {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    renderCaseStudies();

    if (caseModal) {
      caseModal.classList.add('active');
      caseModal.setAttribute('aria-hidden', 'false');
      caseModal.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
    }

    document.querySelectorAll('.card-expanded').forEach(c => c.classList.remove('card-expanded'));
  }

  window.openCaseModal = openCaseModal;

  function closeCaseModal() {
    if (caseModal) {
      caseModal.classList.remove('active');
      caseModal.setAttribute('aria-hidden', 'true');
      caseModal.setAttribute('inert', '');
      document.body.style.overflow = '';
    }
  }

  window.closeCaseModal = closeCaseModal;

  if (openCaseBtn) openCaseBtn.addEventListener('click', openCaseModal);
  if (openCaseContainer) {
    openCaseContainer.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        openCaseModal();
      }
    });
  }
  if (closeCaseBtn) {
    closeCaseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeCaseModal();
    });
  }
  if (caseModal) {
    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) {
        e.preventDefault();
        closeCaseModal();
      }
    });
  }

  document.querySelectorAll('.cs-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cs-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCsFilter = tab.getAttribute('data-cs-filter') || 'all';
      renderCaseStudies();
    });
  });

  if (csSearchInput) {
    csSearchInput.addEventListener('input', (e) => {
      csSearchQuery = e.target.value;
      if (csSearchClearBtn) csSearchClearBtn.style.display = csSearchQuery ? 'block' : 'none';
      renderCaseStudies();
    });
  }

  if (csSearchClearBtn) {
    csSearchClearBtn.addEventListener('click', () => {
      csSearchQuery = '';
      if (csSearchInput) csSearchInput.value = '';
      csSearchClearBtn.style.display = 'none';
      renderCaseStudies();
    });
  }

  function renderCaseStudies() {
    if (!caseGalleryGrid) return;

    const query = csSearchQuery.trim().toLowerCase();
    const filtered = CASE_STUDIES.filter(cs => {
      const matchCat = activeCsFilter === 'all' || cs.category === activeCsFilter;
      if (!matchCat) return false;
      if (!query) return true;

      return cs.title.toLowerCase().includes(query) ||
             cs.summary.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      caseGalleryGrid.innerHTML = `
        <div class="gallery-empty-state" style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--muted);">
          <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
          <p>No case studies found matching "${csSearchQuery}".</p>
        </div>
      `;
      return;
    }

    caseGalleryGrid.innerHTML = filtered.map(cs => {
      return `
        <div class="gallery-card case-study-card-item" data-id="${cs.id}" style="display:flex; flex-direction:column; background:rgba(15,23,42,0.6); border:1px solid rgba(96,165,250,0.2); border-radius:16px; padding:20px; transition:all 0.3s ease;">
          <h3 style="font-size:1.1rem; font-weight:800; color:var(--text); margin:0 0 10px 0; line-height:1.3;">
            ${cs.title}
          </h3>

          <p style="font-size:0.88rem; color:var(--muted); line-height:1.6; margin:0 0 16px 0; text-align:justify; text-justify:inter-word; flex:1;">
            ${cs.summary}
          </p>

          <div style="display:flex; justify-content:center; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:14px; margin-top:auto; width:100%;">
            <a href="${cs.readUrl || '#'}" target="_blank" rel="noopener noreferrer" class="cs-read-btn">
              <span>Read ↗</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  renderCaseStudies();
})();
