import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import DeleteRecipe from './components/DeleteRecipe';
import RecipeDetails from './components/RecipeDetails';
import AllMeals from './components/AllMeals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import  { useState } from 'react';


const App = () => {
/*
   // État pour gérer l'affichage du menu déroulant
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   // Fonction pour basculer l'état du menu
   const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };*/

 
  return (
    <Router>
 
 {/* Section principale de l'en-tête */}
 <header className="header">
        {/* Menu supérieur */}
        <div id= "top-menu" className="bg-danger text-bold py-2 sticky-top">
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              <Link to="/" className="text-light me-3 text-uppercase small">Mes recettes</Link>
              <Link to="/add" className="text-light  me-3 text-uppercase small">Ajoutes des recettes</Link>
              <Link to="/delete" className="text-light  me-3 text-uppercase small">Supprimer des recettes</Link>
              <Link to="/meals" className="text-light  me-3 text-uppercase small">Repas planifiés</Link>
              <Link to="/" className="text-light  me-3 text-uppercase small">Mon compte</Link>
            </div>
          </div>
        </div>

        {/* Section du logo */}
        <div className="text-center py-4 text-danger logo">
        <h1 className="text-center mb-1 text-danger">Success recipes</h1>
        </div>
      </header>

       {/* Contenu principal */}
       <div style={{ marginTop: '70px' }} className="main-content">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/delete" element={<DeleteRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/meals" element={<AllMeals />} />
          </Routes>
        </div>
      <section class="news py-5">
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-9 m-auto text-center">
                <h1 style={{color:'red'}}>Join our community</h1>
                <input type="text" class="px-3" placeholder="Enter your email"/>
                <button class="btn2">
                  Submit
                </button>
            </div>
        </div>
        <div class="row pt-5">
            <div class="col-lg-11 m-auto">
                <div class="row">
                    <div class="col-lg-3 py-3">
                        <h5 class="pb-3">Customer care</h5>
                        <p>Regular</p>
                        <p>On time</p>
                        <p>Always Care</p>
                        </div>
                        <div class="col-lg-3 py-3">
                        <h5 class="pb-3">Customer care</h5>
                        <p>Regular</p>
                        <p>On time</p>
                        <p>Always Care</p>
                        </div>
                        <div class="col-lg-3 py-3">
                        <h5 class="pb-3">Customer care</h5>
                        <p>Regular</p>
                        <p>On time</p>
                        <p>Always Care</p>
                        </div>
                        <div class="col-lg-3 py-3">
                        <h5 class="pb-3">Customer care</h5>
                        <span><i class="fab fa-facebook">facebook</i></span>
                        <span><i class="fab fa-instagram">instagram</i></span>
                        <span><i class="fab fa-twitter">twitter</i></span>
                        <span><i class="fab fa-google-plus">google+</i></span>                       
                    </div>
                </div>

            </div>
        </div>
        <hr/>
        <p class="text-center">copyrignt 2024 All rights reserved. This template is made by laroche</p>
    </div>
 </section>
    </Router>
    
  );
};

export default App;
