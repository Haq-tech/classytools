const tools = [
  {
    name: "Calculator",
    keywords: "math add subtract multiply divide scientific",
    html: `
      <div class="tool-content">
        <input id="calcInput" type="text" placeholder="e.g. 12*5+3" />
        <button onclick="runCalculator()">Calculate</button>
        <div id="calcResult"></div>
      </div>
    `
  },
  {
    name: "Unit Converter",
    keywords: "convert length weight temperature",
    html: `
      <div class="tool-content">
        <select id="unitType">
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
        <input id="unitValue" type="number" placeholder="Value" />
        <select id="unitFrom"></select>
        <span>→</span>
        <select id="unitTo"></select>
        <button onclick="convertUnit()">Convert</button>
        <div id="unitResult"></div>
      </div>
    `
  },
  {
    name: "Time Converter",
    keywords: "convert time seconds minutes hours days",
    html: `
      <div class="tool-content">
        <input id="timeValue" type="number" placeholder="Value" />
        <select id="timeFrom">
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
        <span>→</span>
        <select id="timeTo">
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
        <button onclick="convertTime()">Convert</button>
        <div id="timeResult"></div>
      </div>
    `
  },
  {
    name: "Currency Converter",
    keywords: "convert money currency exchange",
    html: `
      <div class="tool-content">
        <input id="currencyValue" type="number" placeholder="Amount" />
        <select id="currencyFrom"></select>
        <span>→</span>
        <select id="currencyTo"></select>
        <button onclick="convertCurrency()">Convert</button>
        <div id="currencyResult"></div>
      </div>
    `
  },
  {
    name: "Password Generator",
    keywords: "generate password random secure",
    html: `
      <div class="tool-content">
        <input id="pwdLength" type="number" min="4" max="32" value="12" />
        <label><input type="checkbox" id="pwdSymbols" checked> Symbols</label>
        <label><input type="checkbox" id="pwdNumbers" checked> Numbers</label>
        <label><input type="checkbox" id="pwdUpper" checked> Uppercase</label>
        <button onclick="generatePassword()">Generate</button>
        <div id="passwordResult"></div>
      </div>
    `
  },
  {
    name: "Age Calculator",
    keywords: "age birthday date years months days seconds minutes",
    html: `
      <div class="tool-content">
        <input id="ageDate" type="date" />
        <button onclick="calculateAge()">Calculate</button>
        <div id="ageResult"></div>
      </div>
    `
  },
  // ...13 more tools, for brevity, only names and keywords shown:
  { name: "QR Code Generator", keywords: "qr code generate", html: `<div class="tool-content"><input id="qrText" type="text" placeholder="Text or URL"/><button onclick="generateQR()">Generate</button><div id="qrResult"></div></div>` },
  { name: "Markdown Previewer", keywords: "markdown preview", html: `<div class="tool-content"><textarea id="mdInput" rows="3" placeholder="Markdown"></textarea><button onclick="previewMarkdown()">Preview</button><div id="mdResult"></div></div>` },
  { name: "Text Case Converter", keywords: "text case uppercase lowercase", html: `<div class="tool-content"><input id="caseInput" type="text" placeholder="Type text"/><button onclick="toUpperCase()">UPPER</button><button onclick="toLowerCase()">lower</button><div id="caseResult"></div></div>` },
  { name: "Stopwatch", keywords: "stopwatch timer", html: `<div class="tool-content"><button onclick="startStopwatch()">Start</button><button onclick="stopStopwatch()">Stop</button><div id="stopwatchResult"></div></div>` },
  { name: "Countdown Timer", keywords: "countdown timer", html: `<div class="tool-content"><input id="countdownInput" type="number" placeholder="Seconds"/><button onclick="startCountdown()">Start</button><div id="countdownResult"></div></div>` },
  { name: "Random Number Generator", keywords: "random number", html: `<div class="tool-content"><input id="randMin" type="number" placeholder="Min"/><input id="randMax" type="number" placeholder="Max"/><button onclick="generateRandom()">Generate</button><div id="randResult"></div></div>` },
  { name: "BMI Calculator", keywords: "bmi body mass index", html: `<div class="tool-content"><input id="bmiWeight" type="number" placeholder="Weight (kg)"/><input id="bmiHeight" type="number" placeholder="Height (cm)"/><button onclick="calculateBMI()">Calculate</button><div id="bmiResult"></div></div>` },
  { name: "Base64 Encoder/Decoder", keywords: "base64 encode decode", html: `<div class="tool-content"><input id="b64Input" type="text" placeholder="Text"/><button onclick="encodeBase64()">Encode</button><button onclick="decodeBase64()">Decode</button><div id="b64Result"></div></div>` },
  { name: "JSON Formatter", keywords: "json format pretty", html: `<div class="tool-content"><textarea id="jsonInput" rows="3" placeholder="Paste JSON"></textarea><button onclick="formatJSON()">Format</button><div id="jsonResult"></div></div>` },
  { name: "Color Picker", keywords: "color picker", html: `<div class="tool-content"><input id="colorInput" type="color"/><div id="colorResult"></div></div>` },
  { name: "Text Diff Checker", keywords: "text diff compare", html: `<div class="tool-content"><textarea id="diffA" rows="2" placeholder="Text A"></textarea><textarea id="diffB" rows="2" placeholder="Text B"></textarea><button onclick="checkDiff()">Check</button><div id="diffResult"></div></div>` },
  { name: "IP Address Lookup", keywords: "ip lookup", html: `<div class="tool-content"><button onclick="lookupIP()">Lookup</button><div id="ipResult"></div></div>` },
  { name: "UUID Generator", keywords: "uuid generate", html: `<div class="tool-content"><button onclick="generateUUID()">Generate</button><div id="uuidResult"></div></div>` },
  { name: "Palindrome Checker", keywords: "palindrome check", html: `<div class="tool-content"><input id="palindromeInput" type="text" placeholder="Text"/><button onclick="checkPalindrome()">Check</button><div id="palindromeResult"></div></div>` }
];

// Dynamically load tools
function loadTools(filter = "") {
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = "";
  let found = false;
  tools.forEach(tool => {
    if (
      !filter ||
      tool.name.toLowerCase().includes(filter) ||
      tool.keywords.includes(filter)
    ) {
      const card = document.createElement('div');
      card.className = "tool-card";
      card.innerHTML = `<h2>${tool.name}</h2>${tool.html}`;
      grid.appendChild(card);
      found = true;
    }
  });
  if (!found) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center;">No tools found for "${filter}"</div>`;
  }
}

// AI/Search bar logic (basic keyword search, can be extended to use AI APIs)
document.getElementById('searchBar').addEventListener('input', function(e) {
  loadTools(e.target.value.trim().toLowerCase());
});

// Initial load
loadTools();

// --- TOOL FUNCTIONALITY (examples for main tools) ---

window.runCalculator = function() {
  const input = document.getElementById('calcInput').value;
  let result;
  try {
    result = Function('"use strict";return (' + input + ')')();
  } catch {
    result = "Invalid expression.";
  }
  document.getElementById('calcResult').innerText = "Result: " + result;
};

window.convertUnit = function() {
  // Example for length only; expand as needed
  const type = document.getElementById('unitType').value;
  const value = parseFloat(document.getElementById('unitValue').value);
  let from = document.getElementById('unitFrom').value;
  let to = document.getElementById('unitTo').value;
  let result = "Not implemented";
  if (type === "length") {
    const units = { m: 1, km: 1000, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048 };
    result = (value * units[from] / units[to]).toFixed(4) + " " + to;
  }
  document.getElementById('unitResult').innerText = "Result: " + result;
};
// Populate unit selects dynamically (for brevity, only length shown)
document.getElementById('unitType').addEventListener('change', function() {
  const unitFrom = document.getElementById('unitFrom');
  const unitTo = document.getElementById('unitTo');
  unitFrom.innerHTML = unitTo.innerHTML = '';
  ["m","km","cm","mm","in","ft"].forEach(u => {
    unitFrom.innerHTML += `<option value="${u}">${u}</option>`;
    unitTo.innerHTML += `<option value="${u}">${u}</option>`;
  });
});
document.getElementById('unitType').dispatchEvent(new Event('change'));

window.convertTime = function() {
  const value = parseFloat(document.getElementById('timeValue').value);
  const from = document.getElementById('timeFrom').value;
  const to = document.getElementById('timeTo').value;
  const units = { seconds: 1, minutes: 60, hours: 3600, days: 86400 };
  const result = (value * units[from] / units[to]).toFixed(4) + " " + to;
  document.getElementById('timeResult').innerText = "Result: " + result;
};

window.convertCurrency = function() {
  // For demo, use static rates; in production, fetch from API
  const rates = { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1500 };
  const value = parseFloat(document.getElementById('currencyValue').value);
  const from = document.getElementById('currencyFrom').value;
  const to = document.getElementById('currencyTo').value;
  const result = ((value / rates[from]) * rates[to]).toFixed(2) + " " + to;
  document.getElementById('currencyResult').innerText = "Result: " + result;
};
["currencyFrom","currencyTo"].forEach(id => {
  const el = document.getElementById(id);
  ["USD","EUR","GBP","NGN"].forEach(c => {
    el.innerHTML += `<option value="${c}">${c}</option>`;
  });
});

window.generatePassword = function() {
  const length = parseInt(document.getElementById('pwdLength').value);
  const symbols = document.getElementById('pwdSymbols').checked ? "!@#$%^&*()_+" : "";
  const numbers = document.getElementById('pwdNumbers').checked ? "0123456789" : "";
  const upper = document.getElementById('pwdUpper').checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const chars = lower + upper + numbers + symbols;
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById('passwordResult').innerText = "Password: " + pwd;
};

window.calculateAge = function() {
  const dob = new Date(document.getElementById('ageDate').value);
  if (!dob.getTime()) {
    document.getElementById('ageResult').innerText = "Enter a valid date.";
    return;
  }
  const now = new Date();
  const ms = now - dob;
  const years = Math.floor(ms / (365.25*24*3600*1000));
  const days = Math.floor(ms / (24*3600*1000));
  const hours = Math.floor(ms / (3600*1000));
  const minutes = Math.floor(ms / (60*1000));
  const seconds = Math.floor(ms / 1000);
  document.getElementById('ageResult').innerHTML =
    `Years: ${years}<br>Days: ${days}<br>Hours: ${hours}<br>Minutes: ${minutes}<br>Seconds: ${seconds}`;
};

// ...Implement the rest of the tool functions similarly...
