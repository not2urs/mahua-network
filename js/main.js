// ===================================
// TechVision - Premium 3D Website
// Main JavaScript File
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // NAVIGATION
  // ===================================

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");

  // Sticky Navigation on Scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close Mobile Menu on Link Click
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkItems.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  // ===================================
  // SMOOTH SCROLLING
  // ===================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ===================================
  // ANIMATED COUNTERS
  // ===================================

  const statNumbers = document.querySelectorAll(".stat-number");
  let counterAnimated = false;

  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      updateCounter();
    });
  }
  

  function checkCounterVisibility() {
    if (!counterAnimated) {
      const heroStats = document.querySelector(".hero-stats");
      if (heroStats) {
        const rect = heroStats.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          animateCounters();
          counterAnimated = true;
        }
      }
    }
  }

  window.addEventListener("scroll", checkCounterVisibility);
  checkCounterVisibility();

  // ===================================
  // AOS (ANIMATE ON SCROLL) IMPLEMENTATION
  // ===================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll("[data-aos]").forEach((element) => {
    observer.observe(element);
  });

  // ===================================
  // PORTFOLIO FILTERING
  // ===================================

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          item.classList.remove("hidden");
          // Trigger reflow for animation
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.classList.add("hidden");
          }, 300);
        }
      });
    });
  });

  // ===================================
  // 3D CARD TILT EFFECT
  // ===================================

  function applyTiltEffect(cards) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      });
    });
  }

  // Apply tilt effect to service cards and benefit cards
  const serviceCards = document.querySelectorAll(".service-card");
  const benefitCards = document.querySelectorAll(".benefit-card");
  applyTiltEffect(serviceCards);
  applyTiltEffect(benefitCards);

  // ===================================
  // PARALLAX EFFECT FOR FLOATING SHAPES
  // ===================================

  const floatingShapes = document.querySelectorAll(".shape");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;

    floatingShapes.forEach((shape, index) => {
      const speed = 0.1 + index * 0.05;
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ===================================
  // CONTACT FORM HANDLING
  // ===================================

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Simulate form submission (replace with actual API call)
    formMessage.textContent = "Sending your message...";
    formMessage.className = "form-message";
    formMessage.style.display = "block";

    // Simulate API delay
    setTimeout(() => {
      // Success message
      formMessage.textContent =
        "Thank you! Your message has been sent successfully. We will get back to you soon.";
      formMessage.className = "form-message success";

      // Reset form
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }, 1500);

    // In a real application, you would send the data to a server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     formMessage.textContent = 'Thank you! Your message has been sent successfully.';
    //     formMessage.className = 'form-message success';
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     formMessage.textContent = 'Oops! Something went wrong. Please try again.';
    //     formMessage.className = 'form-message error';
    // });
  });

  // ===================================
  // NEWSLETTER FORM HANDLING
  // ===================================

  const newsletterForm = document.getElementById("newsletterForm");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;

    // Show success message (replace with actual API call)
    alert("Thank you for subscribing! Welcome to TechVision newsletter.");
    this.reset();

    // In a real application:
    // fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: email })
    // })
  });

  // ===================================
  // SCROLL TO TOP BUTTON
  // ===================================

  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ===================================
  // LOADING ANIMATION
  // ===================================

  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    }, 100);
  });

  // ===================================
  // CURSOR GLOW EFFECT (OPTIONAL)
  // ===================================

  const createCursorGlow = () => {
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    cursorGlow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
            display: none;
        `;
    document.body.appendChild(cursorGlow);

    // Only show on desktop
    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", function (e) {
        cursorGlow.style.display = "block";
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
      });
    }
  };

  // Uncomment to enable cursor glow effect
  // createCursorGlow();

  // ===================================
  // PERFORMANCE OPTIMIZATION
  // ===================================

  // Lazy loading for images (if you add real images later)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ===================================
  // DYNAMIC YEAR IN FOOTER
  // ===================================

  // const currentYear = new Date().getFullYear();
  // const yearElements = document.querySelectorAll(".footer-bottom p");
  // yearElements.forEach((element) => {
  //   if (element.textContent.includes("2024")) {
  //     element.textContent = element.textContent.replace("2024", currentYear);
  //   }
  // });

  // ===================================
  // INTERACTIVE PORTFOLIO ITEMS
  // ===================================

  portfolioItems.forEach((item) => {
    const portfolioLink = item.querySelector(".portfolio-link");

    if (portfolioLink) {
      portfolioLink.addEventListener("click", function (e) {
        e.preventDefault();

        // Get project info
        const projectTitle =
          item.querySelector(".portfolio-info h3").textContent;

        // Show alert (replace with modal or redirect to project page)
        alert(
          `Opening project: ${projectTitle}\n\nIn a production environment, this would open a detailed project page or modal.`,
        );
      });
    }
  });

  // ===================================
  // ENHANCED 3D CUBE INTERACTION
  // ===================================

  const cubeContainer = document.querySelector(".cube-container");
  const cube = document.querySelector(".cube");

  if (cubeContainer && cube) {
    let isPaused = false;

    cubeContainer.addEventListener("mouseenter", function () {
      cube.style.animationPlayState = "paused";
      isPaused = true;
    });

    cubeContainer.addEventListener("mouseleave", function () {
      cube.style.animationPlayState = "running";
      isPaused = false;
    });

    cubeContainer.addEventListener("mousemove", function (e) {
      if (isPaused) {
        const rect = cubeContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 30;
        const rotateX = ((centerY - y) / centerY) * 30;

        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
  }

  // ===================================
  // RANDOM FLOATING ANIMATION DELAYS
  // ===================================

  const floatingCards = document.querySelectorAll(".float-card");
  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });

  // ===================================
  // CONSOLE WELCOME MESSAGE
  // ===================================

  console.log(
    "%c🚀 TechVision - Premium IT & Marketing Agency",
    "color: #6366f1; font-size: 20px; font-weight: bold; padding: 10px;",
  );
  console.log(
    "%cWebsite crafted with precision and creativity",
    "color: #ec4899; font-size: 14px; padding: 5px;",
  );
  console.log(
    "%cInterested in working with us? Contact: hello@techvision.com",
    "color: #4ade80; font-size: 12px; padding: 5px;",
  );
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Generate random number in range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}






// services pages scroll reveal
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;


  reveals.forEach((el) => {
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run on load



// POPUP 
window.addEventListener("load", () => {
        setTimeout(() => {
            document.getElementById("contactPopup").style.display = "flex";
        }, 1400);
      });
      
      function openPopUp() {
          document.getElementById("contactPopup").style.display = "flex";
          document.getElementById("servicePopUp").style.display = "flex";
          
      }

    function closePopup() {
        document.getElementById("contactPopup").style.display = "none";
        document.getElementById("servicePopUp").style.display = "none";
    }


    document.addEventListener("DOMContentLoaded", function () {
    const popupForm = document.getElementById("popupContactForm");

    if (popupForm) {
        popupForm.addEventListener("submit", function (e) {
            e.preventDefault(); 
            
            const msg = popupForm.querySelector(".form");
            if (msg) {
                msg.innerText = "✅ Thanks! We will contact you shortly.";
                // msg.style.color = "green";
            }
           
            popupForm.reset();
          
            setTimeout(() => {
                closePopup();
            }, 2000);
        });
    }
});

// Gallery POPUP 
//     function openPopup(src) {
//         const popup = document.getElementById("imagePopup");
//         const popupImg = document.getElementById("popupImg");

//         popupImg.src = src;
//         popup.classList.add("active");
//     }

//     function closePopup() {
//         document.getElementById("imagePopup").classList.remove("active");
//     }
    

//     // gallery scrollbar 
//     document.addEventListener("DOMContentLoaded", function () {

//     const slider = document.getElementById("sliderWrapper");
//     const images = slider.querySelectorAll("img");

//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");

//     let index = 0;

//     function updateSlider() {
//         slider.style.transform = `translateX(-${index * 100}%)`;
//     }

//     nextBtn.addEventListener("click", function () {
//         index++;
//         if (index >= images.length) index = 0;
//         updateSlider();
//     });

//     prevBtn.addEventListener("click", function () {
//         index--;
//         if (index < 0) index = images.length - 1;
//         updateSlider();
//     });

//     setInterval(() => {
//     index++;
//     if (index >= images.length) index = 0;
//     updateSlider();
// }, 3000);

// });

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
