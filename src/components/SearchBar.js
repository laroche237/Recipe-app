import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
   
         <div class="navbar navbar-collapseinput-group search-bar" id="navbarScroll">
            <form class="d-flex">
      <input
         class=" px-2 search"
        type="search"
        placeholder="Rechercher une recette "
        className="form-control"
        value={searchTerm}
        aria-label="Rechercher une recette"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      <div>
        {searchTerm && filteredRecipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
        
          </div>
        ))}
      </div>
      </form>
    </div>

  );
};

export default SearchBar;
