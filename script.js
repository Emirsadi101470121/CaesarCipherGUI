function caesarCipher(string, shift) {
  return string.replace(/[a-zA-Z]/g, function (c) {
    const base = c < 'a' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
  });
}

function translate() {
  const plaintextValue = document.getElementById('plaintext').value;
  const shiftValue = parseInt(document.getElementById('shift').value) || 0;
  const outputValue = caesarCipher(plaintextValue, shiftValue);
  document.getElementById('output').innerText = outputValue;
}

document.getElementById('plaintext').addEventListener('input', translate);
document.getElementById('shift').addEventListener('input', translate);
