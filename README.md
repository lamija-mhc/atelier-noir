Dokumentacija DWS

ATELIER NOIR 

1. UVOD / OPIS PROJEKTA
        Projekat pod nazivom "Atelier Noir" predstavlja razvoj web aplikacije posvećene jedinstvenom doživljaju rituala ispijanja kafe, gdje se spajaju kultura, elegancija i autentičnost. Brend "Atelier Noir" njeguje ideju da kafa nije samo napitak, već iskustvo koje povezuje različite krajeve svijeta.
        Aplikacija omogućava korisnicima da pregledaju i naruče specijalitete iz svjetski poznatih regija poput Kolumbije, Etiopije, Brazila i drugih. Pored toga, sistem omogućava administratorima upravljanje proizvodima, sadržajem i korisničkim interakcijama, čime se obezbjeđuje dinamičan i efikasan način vođenja online prodaje.
        Cilj projekta je kreirati modernu, responzivnu i funkcionalnu platformu koja će korisnicima ponuditi jednostavno i estetski privlačno iskustvo naručivanja, a administratorima olakšati upravljanje sadržajem i narudžbama.

2. KORIŠTENE TEHNOLOGIJE
        Za izradu web aplikacije Atelier Noir korišten je skup savremenih web tehnologija koje omogućavaju jednostavno održavanje i lokalno testiranje funkcionalnosti. Projekat je razvijen kao client-server arhitektura, pri čemu frontend i backend komuniciraju putem HTTP zahtjeva.
        Frontend aplikacije je razvijen pomoću React.js, uz korištenje biblioteke React Router za upravljanje navigacijom između različitih stranica. Komponente su organizovane unutar foldera:
src/components – za višekratne komponente (navigacija, kartice, dugmad),
src/pages – za pojedinačne stranice (Home, About, Products, itd.),
src/assets – slike, stilovi i ostali statički resursi.
Kao jednostavno rješenje za simulaciju REST API-ja, korišten je JSON-server, gdje se datoteka db.json koristi kao baza podataka. Omogućava operacije poput GET, POST, PUT i DELETE, što je dovoljno za potrebe ovog projekta.
Node.js i npm korišteni su za upravljanje paketima i pokretanje lokalnih servera.
Frontend server pokreće se na portu 3000, dok se backend server (JSON-server) pokreće na portu 5000, čime se omogućava paralelni razvoj i testiranje klijentske i serverske strane.

3. FUNKCIONALNOSTI
        Web aplikacija Atelier Noir obuhvata niz funkcionalnosti koje omogućavaju interakciju korisnika sa sistemom u skladu s njihovom ulogom (gost ili administrator). Sistem je razvijen s fokusom na jednostavnost korištenja, intuitivnu navigaciju i osnovne funkcije neophodne za online naručivanje proizvoda.
        Login i registracija korisnika sa validacijom unesenih podataka.
Implementirana je podjela korisničkih uloga:
Gost ima pristup pregledavanju proizvoda, dodavanju u korpu i slanju poruka.
Administrator ima dodatne privilegije kao što su dodavanje i uređivanje proizvoda.
        Korisnici mogu dodavati proizvode u korpu, odabrati količinu i pregledati ukupnu cijenu.
Omogućeno je brisanje stavki iz korpe i dinamičko ažuriranje prikaza.
        Proizvodi su prikazani prema unaprijed definisanim kategorijama, čime se korisnicima olakšava navigacija i pretraga ponude.
        Administrator može dodavati nove proizvode, kao i uređivati ili brisati postojeće, čime se omogućava aktivno upravljanje ponudom.
        Aplikacija sadrži kontakt formu s validacijom unosa, putem koje korisnici mogu slati poruke ili upite.
        Na stranici se koristi Google Maps iframe komponenta koja prikazuje fizičku lokaciju brenda, čime se povećava transparentnost i povjerenje korisnika.

4. ULOGE KORISNIKA

        Definisale smo dvije glavne korisničke uloge: gost i administrator. Svaka uloga ima određene privilegije i pristup funkcijama u skladu sa svojom svrhom korištenja aplikacije.
        Korisnik koji nema administratorske privilegije ima pristup sljedećim funkcionalnostima:
-Pregled dostupnih proizvoda i kategorija.
-Dodavanje proizvoda u korpu i pregled izabrane količine i ukupne cijene.
-Slanje poruka putem kontakt forme.
        Korisnik sa dodatnim pravima u odnosu na gosta. Ima pristup svim funkcijama gosta, uz sljedeće dodatne mogućnosti:
-Dodavanje novih proizvoda.
-Uređivanje i brisanje postojećih proizvoda.
-Upravljanje kategorijama proizvoda (kreiranje, izmjena i brisanje).
        Ova podjela omogućava sigurnu i organizovanu upotrebu aplikacije, gdje administratori imaju potpunu kontrolu nad sadržajem, dok gosti imaju jednostavno i intuitivno korisničko iskustvo.

5. DIZAJN
        Vizualni identitet aplikacije Atelier Noir pažljivo je osmišljen kako bi pratio vrijednosti brenda – eleganciju, prefinjenost i kulturu kafe. Fokus je stavljen na estetiku koja odražava luksuz, ali i na dostupnost i funkcionalnost za sve korisnike.
        Korištene su tamne, sofisticirane boje poput crne, smeđe i zlatne, koje evociraju atmosferu luksuznih kafeterija. Paleta je birana tako da zadrži visok kontrast, čime se osigurava dobra čitljivost i za korisnike sa smanjenim sposobnostima percepcije boja.
        Proizvodi su predstavljeni kroz moderne i pregledne "coffee cards" koje sadrže naziv, opis, cijenu i dugme za dodavanje u korpu.
        Svi elementi su dizajnirani s pažnjom na jednostavnu upotrebu – jasno označena dugmad, vidljive informacije, intuitivna navigacija.
        Aplikacija je u potpunosti responsive, što znači da se njen izgled i funkcionalnost automatski prilagođavaju različitim veličinama ekrana – od desktop računara do mobilnih uređaja.
        Korišteni su moderni i čitljivi fontovi, koji doprinose jasnoći prikaza i estetskoj dosljednosti dizajna.
Ovdje idu screenshotovi : Početna stranica, Login forma, Stranica sa proizvodima, Korpa, Kontakt forma.

6. STRUKTURA BAZE
        Za potrebe ovog projekta koristi se JSON-server koji omogućava simulaciju jednostavne baze podataka korištenjem lokalne .json datoteke. Struktura baze organizovana je u nekoliko osnovnih kolekcija koje odgovaraju funkcionalnostima aplikacije:
1. users - sadrži podatke o registrovanim korisnicima, odnosno e-mail, lozinku i ulogu adresu korisnika.
2. products - sadrži sve proizvode koji su dostupni za pregled i kupovinu. U to spadaju: ID, naziv proizvoda, kratak opis, cijena proizvoda, URL slike proizvoda, kategorija kojoj proizvod pripada
3. cart - predstavlja sadržaj korpe za svakog korisnika, preciznije ID korisnika te lista proizvoda sa količinama i cijenama
4. messages - sadrži poruke koje korisnici šalju putem kontakt forme. Njihovi podaci poput ID-a, emaila, imena te same poruke.

- users: email, lozinka, uloga.
- proizvodi: naziv, opis, cijena, slika, kategorija.
- korpa: proizvodi po korisniku.
- poruke: kontakt poruke.

7. INSTALACIJA I POKRETANJE
Za lokalno pokretanje aplikacije Atelier Noir, potrebno je imati instalirane Node.js i npm te pratiti sljedeće korake:
1. Kloniranje repozitorija
git clone <repo-url>

2. Ulazak u projektni direktorij
cd atelier-noir

3. Instalacija potrebnih paketa
npm install

4. Pokretanje JSON-servera (simulacija backend API-ja)
npx json-server --watch db.json --port 5000
Ova komanda pokreće backend na adresi: http://localhost:5000

5. Pokretanje React frontend aplikacije
U novom terminalu:
npm start

Aplikacija će se automatski otvoriti u pretraživaču na adresi:
http://localhost:3000

8. SCREENSHOTOVI
bit ce ovdje

9. DOPRINOS ČLANOVA 
        Projekat Atelier Noir razvijen je timski, kroz saradnju i podjelu odgovornosti u skladu s interesima i vještinama članica. Sve faze – od idejne koncepcije do implementacije – realizovane su zajednički, uz jasno definisane pojedinačne doprinose.

Lamija Mehić
        Radila na frontend implementaciji stranica:
Početna (Home)
Korpa (Cart)
Učestvovala u testiranju funkcionalnosti i prilagođavanju dizajna u završnoj fazi.

Dženana Šehić
        Implementirala stranice za autentikaciju korisnika:
Login
Signup
Profil korisnika
Dodatno radila na povezivanju sa backendom i validaciji podataka.

Amina Kahrimanović
        Inicijalno doprinijela vizuelnom identitetu projekta – izbor naziva, boja i osnovnog estetskog pravca.
Učestvovala u izradi Figma prototipa, zajedno s ostatkom tima.
Implementirala frontend kod za stranice:
O nama
Kontakt

Zajednički rad

Dizajn prototipa aplikacije razvijan je zajednički u Figmi, gdje su sve tri članice aktivno učestvovale.
Nakon izrade pojedinačnih stranica, ostatak projekta (funkcionalnosti korpe, autentikacija, administracija proizvoda, integracija backend servisa i testiranje) razvijan je timski, uz ravnomjernu podjelu rada i međusobnu pomoć.

	10.	ZAKLJUČAK

        Kroz ovaj projekat tim je uspješno prošao sve faze razvoja od početnog dizajna, preko frontend i backend implementacije, do funkcionalnog prototipa koji omogućava naručivanje proizvoda, korisničku registraciju i administraciju sadržaja.
        Projekat je omogućio članicama tima da praktično primijene znanja iz oblasti web razvoja, timske koordinacije i dizajna korisničkog interfejsa. Posebna pažnja posvećena je estetici, pristupačnosti i modularnosti koda, čime je postavljen dobar temelj za eventualno proširenje funkcionalnosti u budućnosti.
       


