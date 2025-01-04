
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";


const CategoryMenu = ({ recipes }) => {

  const [categorie, setCategory] = useState("");

  const navigate = useNavigate();

  // Filtrer les recettes par catégorie
  const selectedCategory = categorie
  ? recipes.filter((recipe) => {
      if (Array.isArray(recipe.category)) {
        // Si c'est un tableau, vérifiez si la catégorie existe dedans
        return recipe.category.some((cat) =>
          cat.toLowerCase().includes(categorie.toLowerCase())
        );
      } else if (typeof recipe.category === "string") {
        // Si c'est une chaîne, faites une comparaison directe
        return recipe.category.toLowerCase().includes(categorie.toLowerCase());
      }
      return false; // Aucun match si category est null ou autre
    })
    : [];

  return (
    <div>   
        <nav className="d-flex">
              <Link onClick={() => setCategory("all")} className="nav-link text-dark fw-bold">Toutes les catégories</Link>
              <Link onClick={() => setCategory("entree")}  className="nav-link text-dark fw-bold">Désserts</Link>
              <Link onClick={() => setCategory("resistance")} className="nav-link text-dark fw-bold">Plats de résistance</Link>
              <Link onClick={() => setCategory("dessert")} className="nav-link text-dark fw-bold">Entrées</Link>
            </nav>
      <div>
      {categorie && (
        <div>
          <p>
            <strong>Catégorie sélectionnée :</strong> {categorie}{" "}
            <span
              style={{
                color: "red",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={() => setCategory(null)}
            >
              ✖
            </span>
          </p>
        </div>
      )}
</div>

<div>
        {selectedCategory.length > 0 ? (
          selectedCategory.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)} // Redirection à la page de détails
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                cursor: "pointer",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p><strong>Temps de cuisson :</strong> {recipe.cooking_time} mins</p>
            </div>
          ))
        ) : (
          <p>{categorie ? "Aucune recette trouvée." : "Rechercher par catégorie."}</p>
        )}
      </div>
      </div>
    
  );
};

export default CategoryMenu;
