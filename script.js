
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check for saved theme preference or use user's system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark');
    updateThemeIcons(true);
  } else {
    body.classList.remove('dark');
    updateThemeIcons(false);
  }

  // Theme toggle buttons
  [themeToggle, themeToggleMobile].forEach(button => {
    button.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  });

  function updateThemeIcons(isDark) {
    const themeButtons = [themeToggle, themeToggleMobile];
    themeButtons.forEach(button => {
      button.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.innerHTML = mobileMenu.classList.contains('active') 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Also update the progress bar
    updateProgressBar();
  });

  // Scroll Progress Bar
  const progressBar = document.querySelector('.progress-bar');

  function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }

  // Scroll to Top
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll Animation
  const handleScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.8);

      if (isVisible) {
        element.classList.add('animate-active');
      }
    });
  };

  // Initial check
  handleScrollAnimations();

  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimations);

  // Animate skill bars when they come into view
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.8);

      if (isVisible && !bar.style.width) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      }
    });
  };

  // Initial check
  animateSkillBars();

  // Add scroll event listener
  window.addEventListener('scroll', animateSkillBars);

  // Changing text in hero section
  const textStrings = ["Developer", "Designer", "Creator"];
  const changingText = document.querySelector('.changing-text');
  let currentTextIndex = 0;

  setInterval(() => {
    currentTextIndex = (currentTextIndex + 1) % textStrings.length;
    changingText.textContent = textStrings[currentTextIndex];
  }, 3000);

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Lower number = faster animation

  const animateCounters = () => {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.8);

      if (isVisible && counter.innerText === '0') {
        const target = +counter.getAttribute('data-count');
        const count = 0;
        const increment = Math.ceil(target / speed);

        const updateCount = () => {
          const currentCount = +counter.innerText;
          if (currentCount < target) {
            counter.innerText = Math.min(currentCount + increment, target);
            setTimeout(updateCount, 30);
          }
        };

        updateCount();
      }
    });
  };

  // Initial check
  animateCounters();

  // Add scroll event listener
  window.addEventListener('scroll', animateCounters);

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toast-close');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.classList.add('loading');

      // Simulate form submission
      setTimeout(() => {
        submitBtn.classList.remove('loading');

        // Show success toast
        toast.classList.add('show');

        // Hide toast after 5 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);

        // Reset form
        contactForm.reset();
      }, 2000);
    });
  }

  // Close toast when clicking on close button
  toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
  });

  // Add current year to footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});
    