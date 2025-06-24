const passwordInput = document.getElementById('password');
const lengthInput = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

// Character sets
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}<>?/|';

function generatePassword() {
  const length = +lengthInput.value;
  let charset = '';

  if (uppercaseEl.checked) charset += upperChars;
  if (lowercaseEl.checked) charset += lowerChars;
  if (numbersEl.checked) charset += numberChars;
  if (symbolsEl.checked) charset += symbolChars;

  if (charset === '') {
    alert('Please select at least one character type.');
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * charset.length);
    password += charset[randIndex];
  }

  return password;
}

generateBtn.addEventListener('click', () => {
  const password = generatePassword();
  passwordInput.value = password;
});

copyBtn.addEventListener('click', () => {
  passwordInput.select();
  document.execCommand('copy');
  alert('Password copied to clipboard!');
});
