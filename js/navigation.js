// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeMobileMenu();
  initializeActiveNav();
});

// Mobile menu toggle
function initializeMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when a link is clicked
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !menuBtn.contains(e.target)
    ) {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// Update active navigation link based on scroll position
function initializeActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!sections.length || !navLinks.length) return;
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (
        scrollPosition >= sectionTop && 
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
    
    // Handle the case when scroll is at the bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      const lastLink = navLinks[navLinks.length - 1];
      lastLink.classList.add('active');
    }
  });
  
  // Set initial active link
  function setInitialActiveLink() {
    const currentSectionId = window.location.hash ? window.location.hash.replace('#', '') : '';
    
    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    } else {
      // If no hash in URL, set the first link as active
      navLinks[0].classList.add('active');
    }
  }
  
  setInitialActiveLink();
}