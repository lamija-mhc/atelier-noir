import React, { useState } from "react";
import "../css/kontakt.css";
import FlyInSection from "../components/FlyInSection.js";
import { ReactTyped } from 'react-typed';

const Kontakt = () => {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [poruka, setPoruka] = useState("");
  const [greska, setGreska] = useState("");
  const [uspjeh, setUspjeh] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska("");
    setUspjeh("");

    if (!ime.trim() || !email.trim() || !poruka.trim()) {
      setGreska("Sva polja su obavezna.");
      return;
    }

    if (!validateEmail(email)) {
      setGreska("Unesite validnu email adresu.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/poruke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ime, email, poruka }),
      });

      if (res.ok) {
        setUspjeh("Poruka je uspješno poslata! Hvala na kontaktu.");
        setIme("");
        setEmail("");
        setPoruka("");
      } else {
        setGreska("Greška pri slanju poruke.");
      }
    } catch (err) {
      console.error("Greška pri slanju poruke:", err);
      setGreska("Server greška.");
    }
  };

  return (
    <section className="kontakt">
      <FlyInSection>
        <div className="contact-content">
          <h1 style={{ fontFamily: "'Playfair Display', serif" }}>
            <ReactTyped strings={["Kontaktirajte nas"]} typeSpeed={50} backSpeed={30} />
          </h1>
          <img className="separator" src="/images/separator.png" alt="Separator" />
          <p>Imate pitanje ili želite sarađivati? Javite nam se putem forme ili posjetite našu lokaciju.</p>

          <div className="contact-wrapper">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.090424983372!2d17.90580207582524!3d44.20509457369071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475eecf0d2507c69%3A0x47984bbce1b8dce1!2s%C5%A0trosmajerova%20ul.%2C%20Zenica%2072000!5e0!3m2!1sbs!2sba!4v1716631932049!5m2!1sbs!2sba"></iframe>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <input type="text" placeholder="Vaše ime" value={ime} onChange={(e) => setIme(e.target.value)} required />
              <input type="email" placeholder="Vaš email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <textarea placeholder="Vaša poruka" rows="5" value={poruka} onChange={(e) => setPoruka(e.target.value)} required></textarea>

              {greska && <p style={{ color: "#b51818" }}>{greska}</p>}
              {uspjeh && <p style={{ color: "#157810" }}>{uspjeh}</p>}

              <button type="submit" className="btn primary">Pošalji poruku</button>
            </form>
          </div>
        </div>
      </FlyInSection>
    </section>
  );
};

export default Kontakt;
