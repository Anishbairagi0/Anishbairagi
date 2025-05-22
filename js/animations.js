// Animation utilities and functions
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollBasedAnimations();
  animateHeroSection();
  initializeElementAnimations();
});

// Initialize scroll-based animations with IntersectionObserver
function initializeScrollBasedAnimations() {
  // Setup intersection observer for animated elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class based on data attribute
        const animationClass = entry.target.dataset.animation || 'fade-in';
        entry.target.classList.add(animationClass);
        
        // Optional: unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe elements with data-animation attribute
  document.querySelectorAll('[data-animation]').forEach(element => {
    observer.observe(element);
  });
  
  // Add animation classes to section headers
  document.querySelectorAll('.section-header').forEach((header, index) => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(header);
    }, 100);
  });
}

// Animate the hero section
function animateHeroSection() {
  const heroElement = document.querySelector('.hero-content');
  if (!heroElement) return;
  
  // Get all children of the hero content
  const heroChildren = heroElement.children;
  
  // Set initial opacity and transform for staggered animation
  for (let i = 0; i < heroChildren.length; i++) {
    // Skip the element with the typewriter class
    if (!heroChildren[i].classList.contains('typewriter')) {
      heroChildren[i].style.opacity = '0';
      heroChildren[i].style.transform = 'translateY(20px)';
      
      // Add transition after a small delay (prevents initial flash)
      setTimeout(() => {
        heroChildren[i].style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 100);
      
      // Stagger the animations
      setTimeout(() => {
        heroChildren[i].style.opacity = '1';
        heroChildren[i].style.transform = 'translateY(0)';
      }, 500 + (i * 200));
    }
  }
}

// Initialize element animations
function initializeElementAnimations() {
  // Animate the skills progress bars
  animateSkillBars();
  
  // Add hover animations to project cards
  animateProjectCards();
  
  // Add hover effects to buttons
  animateButtons();
  
  // Animate certification cards
  animateCertCards();
}

// Animate skill progress bars
function animateSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  const progressBars = skillsSection.querySelectorAll('.progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = width + '%';
            }, index * 200);
          });
        }, 400);
        
        // Only trigger once
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(skillsSection);
}

// Animate project cards
function animateProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  if (!projectCards.length) return;
  
  projectCards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
    }, 100);
    
    // Add observer for each card
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100 * index); // Stagger the animations
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
    
    // Add hover animation
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'var(--shadow)';
    });
  });
}

// Animate buttons
function animateButtons() {
  const buttons = document.querySelectorAll('.btn');
  if (!buttons.length) return;
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
      button.style.boxShadow = 'var(--shadow-md)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '';
    });
  });
}

// Animate certification cards
function animateCertCards() {
  const certCards = document.querySelectorAll('.cert-card');
  if (!certCards.length) return;
  
  certCards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
    }, 100);
    
    // Add observer for each card
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 150 * index); // Stagger the animations
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
    
    // Add hover animation
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = 'var(--shadow-lg)';
      card.style.borderColor = 'var(--color-primary)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'var(--shadow)';
      card.style.borderColor = 'var(--border-color)';
    });
  });
}