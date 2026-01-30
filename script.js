


// === SCROLL FADE-IN EFFECT ===
const faders = document.querySelectorAll('.scroll-fade');

function showOnScroll() {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll); // Trigger on page load

// === Initialize Testimonial Slider ===
document.addEventListener('DOMContentLoaded', function () {
  new Glide('.testimonial-slider', {
    type: 'carousel',
    perView: 1,
    autoplay: 5000,
    hoverpause: true
  }).mount();
});

// === THEME TOGGLE ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const navLinks = document.querySelectorAll('#navMenu a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});

//=== HAMBURGER ===
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('show');
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual form submission

  // Get input values
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  // Get error display elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Get feedback element
  const feedback = document.getElementById('formFeedback');

  // Reset errors
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  feedback.classList.remove('show');
  feedback.textContent = '';

  let isValid = true;

  // Validation checks
  if (name.value.trim() === '') {
    nameError.textContent = 'Please enter your name.';
    nameError.style.display = 'block';
    isValid = false;
  }

  if (email.value.trim() === '') {
    emailError.textContent = 'Please enter your email.';
    emailError.style.display = 'block';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.style.display = 'block';
    isValid = false;
  }

  if (message.value.trim() === '') {
    messageError.textContent = 'Please enter your message.';
    messageError.style.display = 'block';
    isValid = false;
  }

  // Show feedback if valid
  if (isValid) {
    feedback.textContent = 'Message sent successfully!';
    feedback.classList.add('show');

    // Optional: clear the form
    name.value = '';
    email.value = '';
    message.value = '';
  }
});















