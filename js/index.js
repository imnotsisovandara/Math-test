// calculate encrypt    
document.getElementById('encryptButton').addEventListener('click', function () {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    const result = caesarCipher(inputText, shift);
    document.getElementById('result').value = result;
  });

  function caesarCipher(str, shift) {
    return str.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        let shiftedCode = code;

        if ((code >= 65) && (code <= 90)) {
          shiftedCode = ((code - 65 + shift) % 26) + 65;
        } else if ((code >= 97) && (code <= 122)) {
          shiftedCode = ((code - 97 + shift) % 26) + 97;
        }

        return String.fromCharCode(shiftedCode);
      }
      return char;
    }).join('');
  }

// Calculate RSA
// Function to calculate (base^exp) % modulus efficiently using the square and multiply algorithm
function modPow(base, exp, modulus) {
  let result = 1;
  base = base % modulus;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % modulus;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % modulus;
  }

  return result;
}

// Function to calculate the modular inverse using the extended Euclidean algorithm
function modInverse(a, m) {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m === 1) return 1;

  while (a > 1) {
    let q = Math.floor(a / m);
    let t = m;

    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) x1 += m0;

  return x1;
}

// RSA Encryption
function encrypt() {
  const message = document.getElementById('message').value;
  const p = parseInt(document.getElementById('pValue').value);
  const q = parseInt(document.getElementById('qValue').value);
  const e = parseInt(document.getElementById('eValue').value);
  const n = p * q;

  let encryptedMessage = '';

  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    const encryptedCharCode = modPow(charCode, e, n);
    encryptedMessage += encryptedCharCode + ' ';
  }

  document.getElementById('encryptedMessage').value = encryptedMessage.trim();
  document.getElementById('nValue').innerText = n;
}

// RSA Decryption
function decrypt() {
  const encryptedMessage = document.getElementById('encryptedMessage').value.trim();
  const p = parseInt(document.getElementById('pValue').value);
  const q = parseInt(document.getElementById('qValue').value);
  const e = parseInt(document.getElementById('eValue').value);
  const n = p * q;
  const phiN = (p - 1) * (q - 1);
  const d = modInverse(e, phiN);

  let decryptedMessage = '';

  const encryptedCharCodes = encryptedMessage.split(' ').filter(code => code !== '');
  for (const encryptedCharCode of encryptedCharCodes) {
    const charCode = modPow(parseInt(encryptedCharCode), d, n);
    decryptedMessage += String.fromCharCode(charCode);
  }

  document.getElementById('decryptedMessage').value = decryptedMessage;
}

// Function to clear the input and output fields
function resetBtn() {
  document.getElementById('message').value = '';
  document.getElementById('nValue').innerText = '';
  document.getElementById('encryptedMessage').value = '';
  document.getElementById('decryptedMessage').value = '';
}
