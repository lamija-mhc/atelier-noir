Dokumentacija DWS: Atelier Noir
1. Uvod / Opis Projekta
Projekt "Atelier Noir" predstavlja web aplikaciju posvećenu jedinstvenom doživljaju rituala ispijanja kafe, gdje se spajaju kultura, elegancija i autentičnost. Brend "Atelier Noir" njeguje ideju da kafa nije samo napitak, već iskustvo koje povezuje različite krajeve svijeta.

Aplikacija omogućava korisnicima da pregledaju i naruče specijalitete iz svjetski poznatih regija poput Kolumbije, Etiopije, Brazila i drugih. Pored toga, sustav omogućava administratorima upravljanje proizvodima, sadržajem i korisničkim interakcijama, čime se osigurava dinamičan i učinkovit način vođenja online prodaje.

Cilj projekta je kreirati modernu, responzivnu i funkcionalnu platformu koja će korisnicima ponuditi jednostavno i estetski privlačno iskustvo naručivanja, a administratorima olakšati upravljanje sadržajem i narudžbama.

2. Korištene Tehnologije i Arhitektura
Za izradu web aplikacije "Atelier Noir" korišten je skup suvremenih web tehnologija koje omogućavaju jednostavno održavanje i lokalno testiranje funkcionalnosti. Projekt je razvijen kao client-server arhitektura, pri čemu frontend i backend komuniciraju putem HTTP zahtjeva koristeći fetch i axios za asinkrone operacije.

Frontend
Frontend aplikacija je razvijena pomoću React.js, uz korištenje biblioteke React Router za upravljanje navigacijom između različitih stranica. Komponente su organizirane unutar logičkih foldera:

src/components – za višekratne komponente (navigacija, kartice, gumbi).
src/pages – za pojedinačne stranice (Home, About, Products, itd.).
src/assets – slike, stilovi i ostali statički resursi.
Frontend server pokreće se na portu 3000.

Backend
Backend je pokrenut pomoću Node.js. Kao jednostavno rješenje za simulaciju REST API-ja, korišten je JSON-server, gdje se datoteka db.json koristi kao baza podataka. Omogućava operacije poput GET, POST, PUT i DELETE, što je dovoljno za potrebe ovog projekta.

Backend server (JSON-server) pokreće se na portu 5000.

Upravljanje Paketima i Alatima
Node.js i npm (Node Package Manager) korišteni su za upravljanje paketima i pokretanje lokalnih servera. Za istovremeno pokretanje frontenda i backenda koristi se biblioteka concurrently.

Struktura Projekta
Projekt je podijeljen u dva glavna direktorija:

client: Sadrži svu frontend logiku i React aplikaciju. Unutar njega se nalaze standardni React folderi kao što su public i src.
server: Sadrži backend logiku i db.json datoteku koja služi kao baza podataka.
3. Funkcionalnosti Aplikacije
Web aplikacija "Atelier Noir" obuhvaća niz funkcionalnosti koje omogućuju interakciju korisnika sa sustavom u skladu s njihovom ulogom (gost ili administrator). Sustav je razvijen s fokusom na jednostavnost korištenja, intuitivnu navigaciju i osnovne funkcije neophodne za online naručivanje proizvoda.

Login i registracija korisnika: Implementirana je robustna validacija unesenih podataka za siguran pristup.
Podjela korisničkih uloga:
Gost: Ima pristup pregledavanju proizvoda, dodavanju u korpu i slanju poruka.
Administrator: Ima dodatne privilegije kao što su dodavanje i uređivanje proizvoda, te upravljanje kategorijama.
Upravljanje korpom: Korisnici mogu dodavati proizvode u korpu, odabrati količinu i pregledati ukupnu cijenu. Omogućeno je brisanje stavki iz korpe i dinamičko ažuriranje prikaza.
Pregled proizvoda po kategorijama: Proizvodi su prikazani prema unaprijed definiranim kategorijama, čime se korisnicima olakšava navigacija i pretraga ponude.
Administracija proizvoda: Administrator može dodavati nove proizvode, kao i uređivati ili brisati postojeće, čime se omogućuje aktivno upravljanje ponudom.
Kontakt forma: Aplikacija sadrži kontakt formu s validacijom unosa, putem koje korisnici mogu slati poruke ili upite.
Integracija Google Maps: Na stranici se koristi Google Maps iframe komponenta koja prikazuje fizičku lokaciju brenda, čime se povećava transparentnost i povjerenje korisnika.
4. Uloge Korisnika
Definirane su dvije glavne korisničke uloge: Gost i Administrator. Svaka uloga ima određene privilegije i pristup funkcijama u skladu sa svojom svrhom korištenja aplikacije.

Gost: Korisnik bez administratorskih privilegija ima pristup sljedećim funkcionalnostima:

Pregled dostupnih proizvoda i kategorija.
Dodavanje proizvoda u korpu i pregled izabrane količine i ukupne cijene.
Slanje poruka putem kontakt forme.
Administrator: Korisnik s dodatnim pravima u odnosu na gosta. Ima pristup svim funkcijama gosta, uz sljedeće dodatne mogućnosti:

Dodavanje novih proizvoda.
Uređivanje i brisanje postojećih proizvoda.
Upravljanje kategorijama proizvoda (kreiranje, izmjena i brisanje).
Ova podjela omogućava sigurnu i organiziranu upotrebu aplikacije, gdje administratori imaju potpunu kontrolu nad sadržajem, dok gosti imaju jednostavno i intuitivno korisničko iskustvo.

5. Dizajn i Korisničko Iskustvo
Vizualni identitet aplikacije "Atelier Noir" pažljivo je osmišljen kako bi pratio vrijednosti brenda – eleganciju, prefinjenost i kulturu kafe. Fokus je stavljen na estetiku koja odražava luksuz, ali i na dostupnost i funkcionalnost za sve korisnike.

Paleta Boja: Korištene su tamne, sofisticirane boje poput crne, smeđe i zlatne, koje evociraju atmosferu luksuznih kafeterija. Paleta je birana tako da zadrži visok kontrast, čime se osigurava dobra čitljivost i za korisnike sa smanjenim sposobnostima percepcije boja.
Prikaz Proizvoda: Proizvodi su predstavljeni kroz moderne i pregledne "coffee cards" koje sadrže naziv, opis, cijenu i dugme za dodavanje u korpu.
Intuitivno Korisničko Sučelje: Svi elementi su dizajnirani s pažnjom na jednostavnu upotrebu – jasno označena dugmad, vidljive informacije, intuitivna navigacija.
Responsivni Dizajn: Aplikacija je u potpunosti responzivna, što znači da se njen izgled i funkcionalnost automatski prilagođavaju različitim veličinama ekrana – od desktop računala do mobilnih uređaja.
Tipografija: Korišteni su moderni i čitljivi fontovi, koji doprinose jasnoći prikaza i estetskoj dosljednosti dizajna.
6. Struktura Baze Podataka (db.json)
Za potrebe ovog projekta koristi se JSON-server koji omogućava simulaciju jednostavne baze podataka korištenjem lokalne .json datoteke. Struktura baze organizirana je u nekoliko osnovnih kolekcija koje odgovaraju funkcionalnostima aplikacije:

users: Sadrži podatke o registriranim korisnicima, odnosno email, lozinku, i ulogu (npr. "gost", "administrator").
products: Sadrži sve proizvode koji su dostupni za pregled i kupovinu. Uključuje: ID, naziv proizvoda, kratak opis, cijena proizvoda, URL slike proizvoda, kategoriju kojoj proizvod pripada.
cart: Predstavlja sadržaj korpe za svakog korisnika, preciznije ID korisnika te listu proizvoda sa količinama i cijenama.
messages: Sadrži poruke koje korisnici šalju putem kontakt forme. To uključuje ID, email, ime pošiljatelja te samu poruku.
7. Instalacija i Pokretanje Aplikacije
Za lokalno pokretanje aplikacije "Atelier Noir", potrebno je imati instalirane Node.js i npm. Slijedite sljedeće korake:

Kloniranje repozitorija:

Bash

git clone <URL_VASEG_REPOZITORIJA>
Ulazak u projektni direktorij:

Bash

cd atelier-noir
Instalacija svih potrebnih paketa:
Ovo će instalirati ovisnosti i za frontend i za backend.

Bash

npm install
Pokretanje frontenda i backenda istovremeno:
Koristimo concurrently kako bismo istovremeno pokrenuli i frontend (React aplikaciju) i backend (JSON-server).

Bash

npm run dev
Nakon izvršenja ove komande, dogodit će se sljedeće:

Backend (JSON-server) će se pokrenuti na adresi: http://localhost:5000
Frontend (React aplikacija) će se pokrenuti na adresi: http://localhost:3000
Aplikacija će se automatski otvoriti u vašem preferiranom web pregledniku.

8. Screenshotovi
Ovdje će biti dodani vizualni prikazi ključnih dijelova aplikacije:

Početna stranica
Login forma
Stranica s proizvodima
Korpa
Kontakt forma
9. Doprinos Članova Tima
Projekt "Atelier Noir" razvijen je timski, kroz suradnju i podjelu odgovornosti u skladu s interesima i vještinama članica. Sve faze – od idejne koncepcije do implementacije – realizirane su zajednički, uz jasno definirane pojedinačne doprinose.

Lamija Mehić

Radila na frontend implementaciji stranica: Početna (Home) i Korpa (Cart).
Učestvovala u testiranju funkcionalnosti i prilagođavanju dizajna u završnoj fazi.
Dženana Šehić

Implementirala stranice za autentikaciju korisnika: Login, Signup i Profil korisnika.
Dodatno radila na povezivanju sa backendom i validaciji podataka.
Amina Kahrimanović

Inicijalno doprinijela vizualnom identitetu projekta – izbor naziva, boja i osnovnog estetskog pravca.
Učestvovala u izradi Figma prototipa, zajedno s ostatkom tima.
Implementirala frontend kod za stranice: O nama i Kontakt.
Zajednički rad:
Dizajn prototipa aplikacije razvijan je zajednički u Figmi, gdje su sve tri članice aktivno učestvovale. Nakon izrade pojedinačnih stranica, ostatak projekta (funkcionalnosti korpe, autentikacija, administracija proizvoda, integracija backend servisa i testiranje) razvijan je timski, uz ravnomjernu podjelu rada i međusobnu pomoć.

10. Zaključak
Kroz ovaj projekt tim je uspješno prošao sve faze razvoja od početnog dizajna, preko frontend i backend implementacije, do funkcionalnog prototipa koji omogućava naručivanje proizvoda, korisničku registraciju i administraciju sadržaja.

Projekt je omogućio članicama tima da praktično primijene znanja iz oblasti web razvoja, timske koordinacije i dizajna korisničkog sučelja. Posebna pažnja posvećena je estetici, pristupačnosti i modularnosti koda, čime je postavljen dobar temelj za eventualno proširenje funkcionalnosti u budućnosti.