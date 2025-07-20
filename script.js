const resultBox = document.getElementById("result");
const toast = document.getElementById("toast");

document.getElementById("lengthRange").oninput = function () {
  document.getElementById("lengthValue").textContent = this.value;
};

function generatePassword() {
  const length = +document.getElementById("lengthRange").value;
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  let charset = "";
  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) charset += "0123456789";
  if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  if (!charset) {
    resultBox.value = "Choose options";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  resultBox.value = password;
  showStrength(password);
  showToast("Password Generated!");
}

function savePassword() {
  const password = resultBox.value;
  if (!password) return alert("Generate a password first!");

  const label = prompt("Enter a label (e.g., Gmail, Facebook):");
  if (!label) return alert("Label is required!");

  const encrypted = btoa(password); // basic encryption for now

  const saved = JSON.parse(localStorage.getItem("savedPasswords") || "[]");
  saved.push({ label, password: encrypted });
  localStorage.setItem("savedPasswords", JSON.stringify(saved));

  showToast("Password Saved!");
  displaySavedPasswords();
}

function displaySavedPasswords() {
  const table = document.getElementById("savedTable");
  const saved = JSON.parse(localStorage.getItem("savedPasswords") || "[]");

  table.innerHTML = "<tr><th>Label</th><th>Password</th><th>Actions</th></tr>";

  saved.forEach((entry, index) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.textContent = entry.label;

    const passCell = document.createElement("td");
    const masked = "●●●●●●●●";
    passCell.innerHTML = `<span id="pw-${index}">${masked}</span>`;

    const actionCell = document.createElement("td");
    actionCell.innerHTML = `
      <button id="btn-${index}" onclick="togglePassword(${index})">Show</button>

      <button onclick="deletePassword(${index})">Delete</button>
    `;

    row.appendChild(labelCell);
    row.appendChild(passCell);
    row.appendChild(actionCell);
    table.appendChild(row);
  });
}

function togglePassword(index) {
  const saved = JSON.parse(localStorage.getItem("savedPasswords") || "[]");
  const span = document.getElementById(`pw-${index}`);
  const button = document.getElementById(`btn-${index}`);

  if (span.textContent.includes("●")) {
    span.textContent = atob(saved[index].password); // show password
    button.textContent = "Hide";                    // update button text
  } else {
    span.textContent = "●●●●●●●●";                  // mask it
    button.textContent = "Show";                    // update button text
  }
}


function deletePassword(index) {
  if (!confirm("Delete this saved password?")) return;
  const saved = JSON.parse(localStorage.getItem("savedPasswords") || "[]");
  saved.splice(index, 1);
  localStorage.setItem("savedPasswords", JSON.stringify(saved));
  displaySavedPasswords();
}

function showStrength(pwd) {
  const strengthText = document.getElementById("strengthText");
  let strength = 0;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[a-z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;
  if (pwd.length >= 12) strength++;

  const levels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  strengthText.textContent = `Strength: ${levels[strength - 1] || 'Too Short'}`;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("Edit");
  setTimeout(() => {
    toast.classList.remove("Edit");
  }, 2000);
}

// Load saved passwords on start
displaySavedPasswords();
