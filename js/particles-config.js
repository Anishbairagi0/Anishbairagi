// Particles.js Configuration
document.addEventListener("DOMContentLoaded", function() {
  // Only load particles on devices that can handle it well
  if (window.innerWidth > 768) {
    if (typeof particlesJS !== 'undefined') {
      initializeParticles();
    }
  }
});

function initializeParticles() {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#E5E9F0"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#E5E9F0",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.6
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}

// Update particles colors based on theme
function updateParticlesTheme() {
  if (window.pJSDom && window.pJSDom.length > 0) {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const particles = window.pJSDom[0].pJS.particles;
    
    if (isDarkTheme) {
      particles.color.value = '#E5E9F0';
      particles.line_linked.color = '#E5E9F0';
    } else {
      particles.color.value = '#3B4252';
      particles.line_linked.color = '#3B4252';
    }
    
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
}

// Listen for theme changes to update particles
document.addEventListener('themeChanged', updateParticlesTheme);