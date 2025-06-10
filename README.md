
# 🖤 Atelier Noir – Dokumentacija DWS Projekta

## 1. Uvod / Opis Projekta

Atelier Noir je web aplikacija posvećena jedinstvenom doživljaju rituala ispijanja kafe, gdje se spajaju kultura, elegancija i autentičnost. Brend njeguje ideju da kafa nije samo napitak, već iskustvo koje povezuje različite krajeve svijeta.

Aplikacija omogućava:

* Pregled i narudžbu specijaliteta iz svjetskih regija (Kolumbija, Etiopija, Brazil...).
* Administratorsku kontrolu nad proizvodima, porukama i sadržajem.

🎯 Cilj: Kreirati modernu, responzivnu i funkcionalnu platformu za korisnike i administratore.

---

## 2. Korištene Tehnologije i Arhitektura

### 🎨 Frontend

* React.js + React Router
* Komponente smještene unutar:

  * `src/components` – višekratne komponente
  * `src/pages` – stranice (Home, Ponuda, Kontakt...)
  * `src/assets` – slike, CSS, fontovi
* Pokreće se na portu `3000`.

### 🔧 Backend

* Node.js + JSON-server
* REST API koristi `db.json` kao lažnu bazu
* Operacije: `GET`, `POST`, `PUT`, `DELETE`
* Pokreće se na portu `5000`.

### 📦 Upravljanje paketima

* `npm` za instalaciju paketa
* `concurrently` za istovremeno pokretanje frontend i backend servera

### 📁 Struktura projekta


atelier-noir/
│
├── client/        # Frontend (React)
├── server/        # Backend (JSON-server)
└── README.md


---

## 3. Funkcionalnosti Aplikacije

✅ Autentifikacija

* Registracija i prijava korisnika s validacijom

✅ Uloge korisnika

* Gost: pregled proizvoda, dodavanje u korpu, slanje poruka
* Administrator: + dodavanje/uređivanje proizvoda, upravljanje kategorijama

✅ Korpa

* Dodavanje proizvoda i količina
* Brisanje stavki i automatsko ažuriranje cijene

✅ Pregled po kategorijama

✅ Administracija proizvoda

✅ Kontakt forma

* Validacija unosa + slanje poruke

✅ Integracija Google Maps

* Prikaz lokacije brenda u Zenici

---

## 4. Uloge Korisnika

| Uloga             | Privilegije                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| Gost          | ✔ Pregled proizvoda<br>✔ Dodavanje u korpu<br>✔ Slanje poruka                                   |
| Administrator | ✔ Sve kao gost +<br>✔ Dodavanje / uređivanje / brisanje proizvoda<br>✔ Upravljanje kategorijama |

---

## 5. Dizajn i UX

✨ Vizualni identitet reflektuje luksuz i prefinjenost brenda:

* Boje: crna, smeđa, zlatna – za luksuzan izgled
* Responsivni dizajn – prilagođava se svim ekranima
* Kompaktna tipografija – moderna, čitljiva
* Pregledne coffee kartice – naziv, opis, cijena i dugme za dodavanje

---

## 6. Struktura Baze Podataka (`db.json`)

json
{
  "users": [
    { "id": 1, "email": "admin@example.com", "password": "1234", "role": "admin" }
  ],
  "products": [
    { "id": 1, "naziv": "Ethiopian", "opis": "Bogata aroma...", "cijena": 10, "slika": "url", "kategorija": "best" }
  ],
  "cart": [
    { "email": "user@example.com", "stavke": [ { "idProizvoda": 1, "kolicina": 2 } ] }
  ],
  "messages": [
    { "id": 1, "ime": "Ana", "email": "ana@mail.com", "poruka": "Zanima me dostava." }
  ]
}


## 7. Instalacija i Pokretanje Aplikacije

### 📋 Preduvjeti

* Instalirani Node.js i npm

### 🧩 Koraci za pokretanje:

1. Klonirajte repozitorij:

bash
git clone <URL_VAŠEG_REPOZITORIJA>


2. Uđite u projektni direktorij:

bash
cd atelier-noir


3. Instalirajte potrebne pakete (za frontend i backend):

bash
npm install


4. Pokrenite aplikaciju (frontend i backend istovremeno):

bash
npm run dev


🖥 Nakon ove komande:

* Backend (JSON-server) pokreće se na: `http://localhost:5000`
* Frontend (React aplikacija) pokreće se na: `http://localhost:3000`
* Aplikacija će se automatski otvoriti u vašem web pregledniku.

---

## 8. 📸 Screenshotovi

| Stranica    | Opis                               |
| ----------- | ---------------------------------- |
| 🏠 Početna  | Uvod u brend i istaknuti proizvodi |
| 🔐 Login    | Forma za prijavu korisnika         |
| ☕ Proizvodi | Prikaz svih dostupnih kafa         |
| 🛒 Korpa    | Odabrani proizvodi i cijena        |
| ✉️ Kontakt  | Forma za slanje poruka             |

(Screenshotovi će biti dodani kao slike u ovom folderu)

---

## 9. 👩‍💻 Doprinos Članova Tima

Projekt Atelier Noir razvijen je kroz timsku saradnju, uz jasnu raspodjelu zadataka i zajednički rad u svim fazama:

### 🧠 Lamija Mehić

* Frontend implementacija stranica: Početna i Korpa
* Testiranje funkcionalnosti i finalno dizajnersko usklađivanje

### 🔐 Dženana Šehić

* Implementacija autentikacije: Login, Signup, Profil
* Validacija unosa i povezivanje s backendom

### 🎨 Amina Kahrimanović

* Vizualni identitet (naziv, paleta boja, estetika)
* Izrada Figma prototipa
* Frontend stranice: O nama i Kontakt

### 🤝 Zajednički rad:

* Zajednička izrada prototipa u Figma
* Timski rad na funkcijama: korpa, administracija, integracija s backendom i testiranje
* Međusobna podrška i balansiran doprinos u svim fazama razvoja

---

## 10. ✅ Zaključak

Projekt Atelier Noir predstavlja uspješnu realizaciju funkcionalne web aplikacije koja omogućava:

* Narudžbe proizvoda
* Registraciju i login korisnika
* Administraciju sadržaja

Tim je kroz ovaj projekt praktično primijenio znanja iz:

* Frontend i backend razvoja
* Timske saradnje i komunikacije
* Dizajna korisničkog sučelja i UX principa

🎯 Fokus je stavljen na estetiku, pristupačnost, responzivni dizajn i čist, modularan kod – čime je stvoren stabilan temelj za budući razvoj i proširenje funkcionalnosti.
