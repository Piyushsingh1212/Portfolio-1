/* ================================================
   Portfolio — Main JavaScript
   Features:
   1. Mobile nav toggle (hamburger menu)
   2. Dark/Light mode toggle (persisted in localStorage)
   3. Smooth scroll with active-link highlighting
   4. Skill filter (interactive project filter)
   5. Scroll-reveal animations (IntersectionObserver)
   6. Sticky header shadow on scroll
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* -------- DOM References -------- */
  const header      = document.getElementById('site-header');
  const navToggle   = document.getElementById('nav-toggle');
  const navLinks    = document.getElementById('nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const skillCards  = document.querySelectorAll('.skill-card');
  const allLinks    = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('section[id]');

  /* ================================================
     1. MOBILE NAV TOGGLE
     ================================================ */
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    }
  });

  /* ================================================
     2. DARK / LIGHT MODE TOGGLE
     ================================================ */
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  /* ================================================
     3. HEADER SHADOW ON SCROLL
     ================================================ */
  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ================================================
     4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
     ================================================ */
  const highlightNav = () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ================================================
     5. SKILL FILTER
     ================================================ */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          // Animate in
          card.style.animation = 'none';
          // Trigger reflow
          void card.offsetHeight;
          card.style.animation = 'fadeUp 0.4s var(--ease) forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ================================================
     6. SCROLL-REVEAL ANIMATIONS
     ================================================ */
  const revealElements = () => {
    // Add .reveal class to elements that should animate in
    const targets = document.querySelectorAll(
      '.about-text, .highlight-card, .skill-card, .project-card, .contact-card'
    );
    targets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              // Stagger the animations
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, index * 80);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      targets.forEach(el => observer.observe(el));
    } else {
      // Fallback: just show everything
      targets.forEach(el => el.classList.add('visible'));
    }
  };

  revealElements();

  /* ================================================
     7. SMOOTH SCROLL FOR ALL ANCHOR LINKS (fallback)
     ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
