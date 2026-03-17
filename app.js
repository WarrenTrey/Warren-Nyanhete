// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Project videos - with mobile support
  const video1 = document.getElementById("projectVideo1");
  const video2 = document.getElementById("projectVideo2");
  const video3 = document.getElementById("projectVideo3");
  const hoverSign = document.querySelector(".hover-sign");
  
  // Sidebar elements
  const sideBar = document.querySelector(".sidebar");
  const menu = document.querySelector(".menu-icon");
  const close = document.querySelector(".close-icon");
  
  // Check if on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Video handling
  const videoList = [video1, video2, video3].filter(video => video); // Remove undefined
  
  if (!isMobile) {
    // Desktop: hover to play
    videoList.forEach(function (video) {
      // Ensure video is muted for autoplay
      video.muted = true;
      
      video.addEventListener("mouseover", function () {
        video.play().catch(e => console.log("Playback failed:", e));
        if (hoverSign) hoverSign.classList.add("active");
      });
      
      video.addEventListener("mouseout", function () {
        video.pause();
        if (hoverSign) hoverSign.classList.remove("active");
      });
    });
  } else {
    // Mobile: tap to play/pause
    videoList.forEach(function (video) {
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      video.addEventListener("click", function (e) {
        e.preventDefault();
        if (video.paused) {
          video.play().catch(e => console.log("Playback failed:", e));
        } else {
          video.pause();
        }
      });
    });
    
    // Hide hover sign on mobile
    if (hoverSign) hoverSign.style.display = 'none';
  }
  
  // Sidebar functionality
  if (menu && sideBar && close) {
    
    // Remove any existing animation classes
    sideBar.classList.remove("open-sidebar", "close-sidebar");
    
    menu.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      sideBar.classList.remove("close-sidebar");
      sideBar.classList.add("open-sidebar");
    });
    
    close.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      sideBar.classList.remove("open-sidebar");
      sideBar.classList.add("close-sidebar");
    });
    
    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (isMobile) {
          sideBar.classList.remove("open-sidebar");
          sideBar.classList.add("close-sidebar");
        }
      });
    });
    
    // Close sidebar when clicking outside (mobile)
    if (isMobile) {
      document.addEventListener('click', function(e) {
        if (!sideBar.contains(e.target) && !menu.contains(e.target)) {
          if (sideBar.classList.contains('open-sidebar')) {
            sideBar.classList.remove("open-sidebar");
            sideBar.classList.add("close-sidebar");
          }
        }
      });
    }
  }
  
  // Smooth scroll for anchor links (mobile fix)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
});

// Form submission - keep this separate as it was working
function sendMail() {
  // Get form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitBtn = document.querySelector('.contact-box button[type="submit"]');
  
  // Validate inputs
  if (!nameInput || !emailInput || !messageInput) {
    alert("Form elements not found");
    return false;
  }
  
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    alert("Please fill in all fields");
    return false;
  }
  
  if (!isValidEmail(emailInput.value)) {
    alert("Please enter a valid email address");
    return false;
  }
  
  // Save original button text and disable button
  const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
  if (submitBtn) {
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
  }
  
  let parms = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };
  
  // Send email
  emailjs
    .send("service_4z3hh39", "template_i4ao97m", parms)
    .then(function(response) {
      alert("Your message has been sent successfully! I'll get back to you soon.");
      
      // Clear form
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    })
    .catch(function(error) {
      alert("Sorry, something went wrong. Please try again or contact me directly at warrennyanhetet@gmail.com");
      console.error("EmailJS error:", error);
    })
    .finally(function() {
      // Restore button
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
    
  return false; // Prevent form submission
}

// Email validation helper
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
