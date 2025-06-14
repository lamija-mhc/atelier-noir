import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/admin.css";

const AdminPanel = () => {
  const [poruke, setPoruke] = useState([]);
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [gramaza, setGramaza] = useState("");
  const [cijena, setCijena] = useState("");
  const [slika, setSlika] = useState("");

  const [svi, setSvi] = useState([]);
  const [preporuke, setPreporuke] = useState([]);
  const [best, setBest] = useState([]);

const loadMessages = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/poruke");
    setPoruke(res.data);
  } catch (error) {
    console.error("Greška pri učitavanju poruka:", error);
  }
};




  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setSvi(Array.isArray(res.data.svi) ? res.data.svi : []);
      setPreporuke(Array.isArray(res.data.preporuke) ? res.data.preporuke : []);
      setBest(Array.isArray(res.data.best) ? res.data.best : []);
    } catch (error) {
      alert("Greška pri učitavanju podataka.");
      console.error(error);
    }
  };

  const obrisiPoruku = (index) => {
    setPoruke((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    loadData();
    loadMessages();
  }, []);

  const handleAddNew = async (e) => {
    e.preventDefault();

    if (!naziv || !opis || !gramaza || !cijena || !slika) {
      alert("Molimo popunite sva polja.");
      return;
    }

    const noviProizvod = { naziv, opis, gramaza, cijena, slika };

    try {
      await axios.post("http://localhost:5000/api/products/svi", noviProizvod);
      alert("Proizvod dodat u 'svi'.");
      setNaziv("");
      setOpis("");
      setGramaza("");
      setCijena("");
      setSlika("");
      loadData();
    } catch (error) {
      alert("Greška pri dodavanju proizvoda.");
      console.error(error);
    }
  };

  const addToCategory = async (proizvod, kategorija) => {
    try {
      await axios.put(`http://localhost:5000/api/dodaj/${kategorija}`, proizvod);
      loadData();
    } catch (error) {
      alert(error.response?.data?.error || "Greška pri dodavanju u kategoriju.");
    }
  };

  const deleteFromCategory = async (kategorija, naziv) => {
    try {
      await axios.delete(`http://localhost:5000/api/obrisi/${kategorija}/${naziv}`);
      loadData();
    } catch (error) {
      alert("Greška pri brisanju proizvoda.");
      console.error(error);
    }
  };

  return (
    <div className="admin-panel" style={{ padding: "2rem", backgroundColor: "#000" }}>
      <h1>Admin panel - Dodaj novu kafu</h1>
      <form onSubmit={handleAddNew} style={{ maxWidth: "350px", marginBottom: "2rem" }}>
        <input type="text" placeholder="Naziv" value={naziv} onChange={(e) => setNaziv(e.target.value)} />
        <textarea placeholder="Opis" value={opis} onChange={(e) => setOpis(e.target.value)} style={{ resize: "vertical", marginTop: "0.5rem" }} />
        <input type="text" placeholder="Gramaža (npr. 250g)" value={gramaza} onChange={(e) => setGramaza(e.target.value)} style={{ marginTop: "0.5rem" }} />
        <input type="text" placeholder="Cijena (npr. $12.50)" value={cijena} onChange={(e) => setCijena(e.target.value)} style={{ marginTop: "0.5rem" }} />
        <input type="text" placeholder="Putanja do slike" value={slika} onChange={(e) => setSlika(e.target.value)} style={{ marginTop: "0.5rem" }} />
        <button type="submit" style={{ marginTop: "1rem" }}>Dodaj u 'svi'</button>
      </form>

      <div className="container" style={{ gap: "2rem", display: "flex" }}>
        <section className="section" style={{ flex: 1 }}>
          <h2>Preporuke (max 4)</h2>
          <div className="kafa-list" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {preporuke.length === 0 && <p>Nema proizvoda.</p>}
            {preporuke.map((p) => (
              <div key={p.naziv} className="kafa">
                <span>{p.naziv}</span>
                <div className="kafa-buttons">
                  <button onClick={() => deleteFromCategory("preporuke", p.naziv)}>Obriši</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ flex: 1 }}>
          <h2>Best (max 4)</h2>
          <div className="kafa-list" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {best.length === 0 && <p>Nema proizvoda.</p>}
            {best.map((p) => (
              <div key={p.naziv} className="kafa">
                <span>{p.naziv}</span>
                <div className="kafa-buttons">
                  <button onClick={() => deleteFromCategory("best", p.naziv)}>Obriši</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ flex: 1 }}>
          <h2>Svi proizvodi</h2>
          <div className="kafa-list" style={{ maxHeight: "250px", overflowY: "auto" }}>
            {svi.length === 0 && <p>Nema proizvoda.</p>}
            {svi.map((p) => (
              <div key={p.naziv} className="kafa">
                <span>{p.naziv}</span>
                <div className="kafa-buttons">
                  <button onClick={() => addToCategory(p, "preporuke")} disabled={preporuke.length >= 4} title={preporuke.length >= 4 ? "Preporuke su pune" : ""}>
                    Dodaj u preporuke
                  </button>
                  <button onClick={() => addToCategory(p, "best")} disabled={best.length >= 4} title={best.length >= 4 ? "Best kategorija je puna" : ""}>
                    Dodaj u best
                  </button>
                  <button onClick={() => deleteFromCategory("svi", p.naziv)}>Obriši</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Poruke korisnika</h2>
        {poruke.length === 0 ? (
          <p>Nema poruka.</p>
        ) : (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {poruke.map((msg, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#111",
                  color: "#fff",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                }}
              >
                <p><strong>Ime:</strong> {msg.ime || "Nepoznato"}</p>
                <p><strong>Email:</strong> {msg.email || "Nepoznat"}</p>
                <p><strong>Poruka:</strong> {msg.poruka || "Prazno"}</p>
                <button onClick={() => obrisiPoruku(index)} style={{ marginTop: "0.5rem" }}>Obriši</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
