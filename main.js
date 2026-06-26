/* ========================================
   Ahmet Filik — Landing Page Scripts
   ======================================== */

// ---------- Navbar Scroll Effect ----------
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ---------- Mobile Menu Toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ---------- Smooth Scroll for Anchor Links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ---------- Scroll Reveal Animation ----------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ---------- Staggered Animation for Grid Items ----------
const staggerContainers = document.querySelectorAll('.problem-grid, .packages-grid, .sectors-grid, .steps-grid');

staggerContainers.forEach(container => {
  const children = container.querySelectorAll('.reveal');
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * 100}ms`;
  });
});

// ---------- Active Nav Link on Scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const observeSections = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section => {
  observeSections.observe(section);
});

// ---------- Package Card Hover Glow Effect ----------
const packageCards = document.querySelectorAll('.package-card');

packageCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ---------- Counter Animation for Stats ----------
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const startTime = performance.now();
  
  const isNumber = !isNaN(parseInt(target));
  if (!isNumber) return;
  
  const targetNum = parseInt(target);
  const suffix = target.replace(/[0-9]/g, '');
  
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (targetNum - start) * eased);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };
  
  requestAnimationFrame(update);
};

// Observe stats for counter animation
const statValues = document.querySelectorAll('.hero-stat-value');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      animateCounter(entry.target, text);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statValues.forEach(stat => {
  statsObserver.observe(stat);
});

// ---------- Parallax Background Effect ----------
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.setProperty('--scroll', `${scrolled * 0.3}px`);
  }
});

// ---------- Console Branding ----------
console.log(
  '%c🚀 Ahmet Filik — Sosyal Medya Yönetimi',
  'color: #6C3CE1; font-size: 18px; font-weight: bold;'
);
console.log(
  '%cKahramanmaraş & Çevre İller',
  'color: #F97316; font-size: 14px;'
);
