const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./auth');

const app = express();
const PORT = 3000;

// Parsiranje formi i JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servira statičke fajlove iz root foldera
app.use(express.static(path.join(__dirname, '..')));

// --- Rute za registraciju i login (postojeće) ---

app.post('/register', (req, res) => {
  const result = registerUser(req.body);
  if (result.success) {
    res.send(`<script>alert("Registracija uspješna!"); window.location.href = "registracija/log-in.html";</script>`);
  } else {
    res.send(`<script>alert("${result.message}"); window.history.back();</script>`);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const result = loginUser(username, password);

  if (result.success) {
    const redirectPage = result.role === 'admin' ? 'registracija/admin.html' : 'registracija/user.html';
    res.send(`
      <script>
        localStorage.setItem('korisnik', JSON.stringify({ username: "${username}", role: "${result.role}" }));
        window.location.href = "${redirectPage}";
      </script>
    `);
  } else {
    res.send(`<script>alert("Pogrešan email ili lozinka!"); window.history.back();</script>`);
  }
});

// Putanja do data.json
const dataPath = path.join(__dirname, '..', 'data.json');

// --- RUTA: Dohvati ceo data.json ---
app.get('/dohvatiKafu', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Greška pri čitanju fajla.' });
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch {
      res.status(500).json({ success: false, message: 'Greška pri parsiranju fajla.' });
    }
  });
});

// --- RUTA: Dodaj novu kafu u "svi" ---
app.post('/upisi', (req, res) => {
  const noviProizvod = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Greška pri čitanju fajla.' });

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      return res.status(500).json({ success: false, message: 'Greška pri parsiranju fajla.' });
    }

    jsonData.svi.push(noviProizvod);

    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Greška pri upisu.' });
      res.json({ success: true, message: 'Proizvod je uspješno dodat.' });
    });
  });
});

// --- RUTA: Dodaj kaficu u kategoriju ("preporuke" ili "best") ---
app.post('/dodajUKategoriju', (req, res) => {
  const { kategorija, naziv } = req.body; // očekujemo kategoriju i naziv kafe

  if (!['preporuke', 'best'].includes(kategorija)) {
    return res.status(400).json({ success: false, message: 'Nepoznata kategorija.' });
  }

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Greška pri čitanju fajla.' });

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      return res.status(500).json({ success: false, message: 'Greška pri parsiranju fajla.' });
    }

    // Provera da li već postoji u kategoriji
    if (jsonData[kategorija].some(kafa => kafa.naziv === naziv)) {
      return res.status(400).json({ success: false, message: 'Kafa je već u toj kategoriji.' });
    }

    // Provera limita (max 4)
    if (jsonData[kategorija].length >= 4) {
      return res.status(400).json({ success: false, message: 'Kategorija je već puna (max 4).' });
    }

    // Pronađi kaficu u "svi"
    const kafaZaDodati = jsonData.svi.find(kafa => kafa.naziv === naziv);
    if (!kafaZaDodati) {
      return res.status(404).json({ success: false, message: 'Kafa nije pronađena u "svi".' });
    }

    jsonData[kategorija].push(kafaZaDodati);

    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Greška pri upisu.' });
      res.json({ success: true, message: `Kafa dodata u ${kategorija}.` });
    });
  });
});

// --- RUTA: Ukloni kaficu iz kategorije ---
app.post('/ukloniIzKategorije', (req, res) => {
  const { kategorija, naziv } = req.body;

  if (!['preporuke', 'best'].includes(kategorija)) {
    return res.status(400).json({ success: false, message: 'Nepoznata kategorija.' });
  }

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Greška pri čitanju fajla.' });

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      return res.status(500).json({ success: false, message: 'Greška pri parsiranju fajla.' });
    }

    const novaLista = jsonData[kategorija].filter(kafa => kafa.naziv !== naziv);
    jsonData[kategorija] = novaLista;

    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ success: false, message: 'Greška pri upisu.' });
      res.json({ success: true, message: `Kafa uklonjena iz ${kategorija}.` });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
