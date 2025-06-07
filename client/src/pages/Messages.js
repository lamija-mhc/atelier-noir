import React, { useEffect, useState } from "react";

const Messages = () => {
  const [poruke, setPoruke] = useState([]);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    const fetchPoruke = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/poruke");
        if (res.ok) {
          const data = await res.json();
          setPoruke(data);
        } else {
          setGreska("Greška pri učitavanju poruka.");
        }
      } catch (err) {
        setGreska("Server greška.");
      }
    };

    fetchPoruke();
  }, []);

  return (
    <div className="admin-section">
      <h2>Primljene poruke</h2>
      {greska && <p style={{ color: "red" }}>{greska}</p>}
      {poruke.length === 0 ? (
        <p>Nema poruka.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Poruka</th>
            </tr>
          </thead>
          <tbody>
            {poruke.map((p) => (
              <tr key={p._id}>
                <td>{p.ime}</td>
                <td>{p.email}</td>
                <td>{p.poruka}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Messages;
