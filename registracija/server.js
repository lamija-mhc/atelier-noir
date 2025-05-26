const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./auth');

const app = express();
const PORT = 3000;

// Parsiranje formi
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static fajlovi (služi čitav projekt)
app.use(express.static(path.join(__dirname, '..')));

// Ruta za registraciju
app.post('/register', (req, res) => {
  const result = registerUser(req.body);
  if (result.success) {
    res.send(`<script>alert("Registracija uspješna!"); window.location.href = "registracija/log-in.html";</script>`);
  } else {
    res.send(`<script>alert("${result.message}"); window.history.back();</script>`);
  }
});

// Ruta za login
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

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
