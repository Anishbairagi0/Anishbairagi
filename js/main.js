// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initializeTypewriter();
  initializeScrollAnimation();
  initializeProjectFilter();
  initializeFormValidation();
  initializeCustomCursor();
});

// Typewriter effect in the hero section
function initializeTypewriter() {
  const typedTextElement = document.getElementById('typed-text');
  if (!typedTextElement) return;
  
  const textArray = [
    'Student',
    'Web Developer',
    'Python Programmer',
    'Cybersecurity Enthusiast'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 150;
  let erasingDelay = 100;
  let newTextDelay = 2000; // Delay between current and next text
  
  function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      // Remove character
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      // Add character
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 150;
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
      // Set delete to true after delay
      isDeleting = true;
      typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      textIndex = (textIndex + 1) % textArray.length;
    }
    
    setTimeout(typeText, typingDelay);
  }
  
  // Start the typewriter effect
  setTimeout(typeText, newTextDelay);
}

// Initialize scroll animations
function initializeScrollAnimation() {
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
    
    // Animate elements when they come into view
    animateOnScroll();
  });
  
  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('.menu-btn');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuBtn.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
  
  // Initial scroll to activate animations
  animateOnScroll();
}

// Project filtering system
function initializeProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterButtons.length || !projectCards.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Form validation
function initializeFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
 
     contactForm.addEventListener('submit', function(e) {
    
    // Basic form validation
    let isValid = true;
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });
    
    const emailInput = contactForm.querySelector('#email');
    if (emailInput && !validateEmail(emailInput.value)) {
      isValid = false;
      emailInput.classList.add('error');
    }
  
    // Validate email format
    function validateEmail(email) {
      const re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  });  // <-- This was missing and now closes the event listener
}

// Custom cursor effect
function initializeCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  
  // Only enable on larger screens
  if (window.innerWidth > 991) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.display = 'block';
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .cert-card, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(110, 87, 224, 0.1)';
        cursor.style.borderColor = 'var(--color-primary)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(110, 87, 224, 0.3)';
        cursor.style.borderColor = 'transparent';
      });
    });
  } else {
    cursor.style.display = 'none';
  }
}

// Animate elements on scroll
function animateOnScroll() {
  // Add animated-section class to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (!section.classList.contains('animated-section')) {
      section.classList.add('animated-section');
    }
  });
  
  // Make elements visible when they enter the viewport
  const animatedElements = document.querySelectorAll('.animated-section');
  
  animatedElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('visible');
      
      // Animate skill bars when the skills section becomes visible
      if (element.id === 'skills') {
        setTimeout(() => {
          const skillBars = document.querySelectorAll('.progress');
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.setProperty('--skill-percent', width + '%');
            bar.style.width = width + '%';
          });
        }, 300);
      }
    }
  });
}
