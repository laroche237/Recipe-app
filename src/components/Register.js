import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
      console.log("Utilisateur inscrit :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
