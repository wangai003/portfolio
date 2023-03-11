// Toggle mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Smooth scroll to sections
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sectionId = link.getAttribute('href');
    const section = document.querySelector(sectionId);

    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Form validation
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const submitBtn = document.querySelector('button[type="submit"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name === '') {
    setErrorFor(nameInput, 'Name is required');
  } else {
    setSuccessFor(nameInput);
  }

  if (email === '') {
    setErrorFor(emailInput, 'Email is required');
  } else if (!isValidEmail(email)) {
    setErrorFor(emailInput, 'Email is not valid');
  } else {
    setSuccessFor(emailInput);
  }

  if (message === '') {
    setErrorFor(messageInput, 'Message is required');
  } else {
    setSuccessFor(messageInput);
  }

  if (name !== '' && email !== '' && isValidEmail(email) && message !== '') {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
      alert('Message sent!');
    }, 3000);
  }
});

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector('.error-message');

  formControl.classList.add('error');
  errorMessage.textContent = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  formControl.classList.remove('error');
}

function isValidEmail(email) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
}
