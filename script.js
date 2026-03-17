function sendMail() {
  // Get form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitBtn = document.querySelector('.contact-box button[type="submit"]');
  
  // Validate inputs
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    alert("Please fill in all fields");
    return false;
  }
  
  if (!isValidEmail(emailInput.value)) {
    alert("Please enter a valid email address");
    return false;
  }
  
  // Save original button text and disable button
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending...';
  submitBtn.disabled = true;
  
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
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
    
  return false; // Prevent form submission
}

// Email validation helper
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
