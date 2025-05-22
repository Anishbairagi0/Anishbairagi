// Theme Toggling Functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeThemeToggle();
});

// Initialize theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const sunIcon = document.querySelector('.theme-toggle .fa-sun');
  const moonIcon = document.querySelector('.theme-toggle .fa-moon');
  
  if (!themeToggle || !sunIcon || !moonIcon) return;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or default to dark
  if (savedTheme === 'light') {
    applyLightTheme();
  } else {
    applyDarkTheme();
  }
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      applyLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      applyDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Apply light theme
  function applyLightTheme() {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    
    // Update CSS variables
    document.documentElement.style.setProperty('--bg-primary', 'var(--light-bg-primary)');
    document.documentElement.style.setProperty('--bg-secondary', 'var(--light-bg-secondary)');
    document.documentElement.style.setProperty('--text-primary', 'var(--light-text-primary)');
    document.documentElement.style.setProperty('--text-secondary', 'var(--light-text-secondary)');
    document.documentElement.style.setProperty('--border-color', 'var(--light-border)');
    document.documentElement.style.setProperty('--card-bg', 'var(--light-card-bg)');
    
    // Update icons
    sunIcon.classList.add('active');
    moonIcon.classList.remove('active');
    
    // Update particles.js colors if active
    updateParticlesColors('light');
  }
  
  // Apply dark theme
  function applyDarkTheme() {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    
    // Update CSS variables
    document.documentElement.style.setProperty('--bg-primary', 'var(--dark-bg-primary)');
    document.documentElement.style.setProperty('--bg-secondary', 'var(--dark-bg-secondary)');
    document.documentElement.style.setProperty('--text-primary', 'var(--dark-text-primary)');
    document.documentElement.style.setProperty('--text-secondary', 'var(--dark-text-secondary)');
    document.documentElement.style.setProperty('--border-color', 'var(--dark-border)');
    document.documentElement.style.setProperty('--card-bg', 'var(--dark-card-bg)');
    
    // Update icons
    moonIcon.classList.add('active');
    sunIcon.classList.remove('active');
    
    // Update particles.js colors if active
    updateParticlesColors('dark');
  }
  
  // Update particles.js colors based on theme
  function updateParticlesColors(theme) {
    if (window.pJSDom && window.pJSDom.length > 0) {
      const particles = window.pJSDom[0].pJS.particles;
      
      if (theme === 'light') {
        particles.color.value = '#3B4252';
        particles.line_linked.color = '#3B4252';
      } else {
        particles.color.value = '#E5E9F0';
        particles.line_linked.color = '#E5E9F0';
      }
      
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }
}