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


---

## 7. Instalacija i Pokretanje Aplikacije

### 🔽 Prvo kloniraj repozitorij:

bash
git clone https://github.com/tvojusername/atelier-noir.git
cd atelier-noir


### 📦 Instalacija paketa:

bash
npm install
cd client && npm install
cd ../server && npm install


### ▶️ Pokretanje aplikacije:

bash
npm run dev


> Ovo pokreće frontend na `http://localhost:3000` i backend na `http://localhost:5000`.

---
