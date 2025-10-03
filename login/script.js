function getFormElements() {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const togglePassword = document.getElementById('toggle-password');
  return { form, emailInput, passwordInput, emailError, passwordError, togglePassword };
}

function setError(input, errorEl, message) {
  input.classList.add('user-error');
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove('user-error');
  errorEl.textContent = '';
}

function isValidEmail(value) {
  return /.+@.+\..+/.test(value);
}

function bindValidation() {
  const { form, emailInput, passwordInput, emailError, passwordError, togglePassword } = getFormElements();

  emailInput.addEventListener('input', () => {
    if (emailInput.value.length === 0) {
      setError(emailInput, emailError, 'Email is required');
    } else if (!isValidEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Enter a valid email');
    } else {
      clearError(emailInput, emailError);
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length === 0) {
      setError(passwordInput, passwordError, 'Password is required');
    } else if (passwordInput.value.length < 8) {
      setError(passwordInput, passwordError, 'Use 8+ characters');
    } else {
      clearError(passwordInput, passwordError);
    }
  });

  togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePassword.setAttribute('aria-pressed', String(isHidden));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Run final validation
    if (!isValidEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Enter a valid email');
      emailInput.focus();
      return;
    }
    if (passwordInput.value.length < 8) {
      setError(passwordInput, passwordError, 'Use 8+ characters');
      passwordInput.focus();
      return;
    }

    // Simulate login
    const submitButton = form.querySelector('.submit');
    const prevText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in…';

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = prevText;
      alert('Signed in! (demo)');
      form.reset();
      clearError(emailInput, emailError);
      clearError(passwordInput, passwordError);
    }, 800);
  });
}

function main() {
  bindValidation();
}

main();
