import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users");
      const users = await res.json();

      const user = users.find(
        (u) => u.email === email && u.lozinka === lozinka
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userEmail", user.email);

        window.dispatchEvent(new Event("storage"));

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setGreska("Pogrešan email ili lozinka.");
      }
    } catch (err) {
      setGreska("Došlo je do greške prilikom prijave.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left" style={{ background: "black" }}>
        <div className="signup-form-container">
          <h1>Prijava</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Lozinka"
              value={lozinka}
              required
              onChange={(e) => setLozinka(e.target.value)}
            />
            <button type="submit">Prijavi se</button>
            {greska && <p className="signup-error">{greska}</p>}
          </form>
          <div className="signup-links">
            <Link to="/signup">Nemate nalog? Registrujte se</Link>
          </div>
        </div>
      </div>
      <div className="signup-right"></div>
    </div>
  );
};

export default Login;
