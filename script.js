function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_4z3hh39", "template_i4ao97m", parms)
    .then(alert("Your message has been sent successfully!"));
}
