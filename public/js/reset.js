const form = document.querySelector('#reqcode');
const emailError = document.querySelector('.c-alert.emailalert');
const passwordError = document.querySelector('.c-alert.psalert');
const otpError = document.querySelector('.c-alert.otp');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  // get values
  const email = form.email.value;
  const password = form.password.value;
  try {
    const res = await fetch('/reqcode', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    if (data.errors) {
      emailError.innerHTML = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.status) {
        document.querySelector("#submitcode").style.display="block"
        form.style.display="none"
        otpError.textContent="Verification code succesfully Sent"
    }
  }
  catch (err) {
    console.log(err);
  }
});
const form1 = document.querySelector('#submitcode');
form1.addEventListener('submit', async (e) => {
  e.preventDefault();
  // reset errors
  otpError.textContent=""
  // get values
  const otp=form1.otp.value
  const email = form.email.value;
  const password = form.password.value;
  try {
    const res = await fetch('/submitcode', { 
      method: 'POST', 
      body: JSON.stringify({otp, email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    if (data.errors) {
        console.log(errors)
      otpError.innerHTML = data.errors.otp;
    }
    if (data.user) {
        location.assign("/")
    }
  }
  catch (err) {
    console.log(err);
  }
});