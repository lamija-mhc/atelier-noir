const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./auth');
const multer = require('multer');

const app = express();

// Povećavamo limit veličine zahteva (body) na 10MB
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ostali middlewares i rute idu posle ovoga

const PORT = 3000;

// Multer storage konfiguracija
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'images')); // folder za slike
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

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
// Izmenjena da prima upload slike
app.post('/upisi', upload.single('slika'), (req, res) => {
  try {
    const { naziv, opis, gramaza, cijena } = req.body;
    const slikaPutanja = req.file ? 'images/' + req.file.filename : null;

    if (!naziv || !opis || !gramaza || !cijena || !slikaPutanja) {
      return res.status(400).json({ success: false, message: 'Svi podaci su obavezni, uključujući sliku!' });
    }

    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ success: false, message: 'Greška pri čitanju fajla.' });

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch {
        return res.status(500).json({ success: false, message: 'Greška pri parsiranju fajla.' });
      }

      // Dodaj kaficu sa slikom u "svi"
      jsonData.svi.push({ naziv, opis, gramaza, cijena, slika: slikaPutanja });

      fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Greška pri upisu.' });
        res.json({ success: true, message: 'Proizvod je uspješno dodat sa slikom.' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Došlo je do greške na serveru.' });
  }
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
