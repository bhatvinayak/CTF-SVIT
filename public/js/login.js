const form = document.querySelector('#login');
const emailError = document.querySelector('.c-alert.emailalert.login');
const passwordError = document.querySelector('.c-alert.psalert.login');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  // get values
  const email = form.email.value;
  const password = form.password.value;
  try {
    const res = await fetch('/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    if (data.errors) {
      emailError.innerHTML = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign('/');
    }
  }
  catch (err) {
    console.log(err);
  }
});

const form1 = document.querySelector('#signup');
const emailError1 = document.querySelector('.c-alert.emailalert.signup');
const passwordError1 = document.querySelector('.c-alert.psalert.signup');

form1.addEventListener('submit', async (e) => {
  e.preventDefault();
  // reset errors
  emailError1.textContent = '';
  passwordError1.textContent = '';
  // get values
  const email = form1.email.value;
  const password = form1.password.value;
  try {
    const res = await fetch('/signup', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError1.textContent = data.errors.email;
      passwordError1.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign('/');
    }
  }
  catch (err) {
    console.log(err);
  }
});