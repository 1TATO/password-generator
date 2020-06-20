const clipboard = document.getElementById('clipboard');
const result = document.getElementById('result');
const length = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

generate.addEventListener('click', () => {
  const lengthValue = +length.value;
  const hasUpper = uppercase.checked;
  const hasLower = lowercase.checked;
  const hasNumber = numbers.checked;
  const hasSymbol = symbols.checked;

  result.innerHTML = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    lengthValue
  );
});

clipboard.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const password = result.innerHTML;

  if(!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();

  alert('Password copied to clipboard');
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;

  const typesArray = [
    { lower },
    { upper },
    { number },
    { symbol }
  ].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for(let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunction[funcName]();
    });
  }

  const finalPassword = (generatedPassword.slice(0, length));

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]\/+=-_`~<>.:;'
  return symbols[Math.floor(Math.random() * symbols.length)];
}