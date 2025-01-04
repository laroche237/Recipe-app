import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
//import DeleteRecipe from './DeleteRecipe';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  //const [error, setError] = useState(null);



  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div className="container my-4">
      <div className="border-danger border-top border-bottom header-spacing">
          <div className="container d-flex justify-content-between align-items-center ">
            <div className="input-group search-bar category-search-bar ">
            <nav class="navbar ">
      <div className="category-menu">
        <CategoryMenu recipes={recipes} />
      </div>
      <div className="search-bar">
        <SearchBar recipes={recipes} />
      </div>  
  </nav>
             
            </div>
          </div>
      
        </div>
      

      <div className="row">
      
      <h1 className="text-center mb-1 text-danger" >Toutes les recettes</h1>
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card h-100 d-flex flex-column justify-content-between"
  style={{
    backgroundImage: `url(${recipe.photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px", // Hauteur fixe
  }}>
         
             <div className="card-body text-white">
                <h4 className="card-title">{recipe.title}</h4>
                <p className="card-text">{recipe.description}</p>
                <p className="card-text"><strong>Cooking Time:</strong> {recipe.cooking_time} min</p>
                <button
                  className="btn btn-danger" onClick={() => window.location.href = `/recipe/${recipe.id}`}>View Recipe</button>
           
            </div>
            </div>
            </div>
        ))}
    
    </div>

    <section class="contact py-5">
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-5 m-auto text-center">
                <h1>Contact Us</h1>
                <h6 style={{color:'red'}}>Always be in touch with us</h6>
            </div>
        </div>
        <div class="row py-5">
            <div class="col-lg-9 m-auto">
                <div class="row">
                    <div class="col-lg-4">
                        <h6>LOCATION</h6>
                        <p>Bastos</p>
                    
                    <h6>PHONE</h6>
                        <p>+237 698754123</p>
                    
                    <h6>EMAIL</h6>
                        <p>emailmoi@gmail.com</p>
                    </div>
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="col-lg-6">
                                <input type="text" class="form-control bg-light" placeholder="first name"/>
                            </div>
                            <div class="col-lg-6">
                                <input type="text" class="form-control bg-light" placeholder="Last name"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 py-3">
                                <textarea name="" id="" class="form-control bg-light" placeholder="Enter your message" cols="10" rows="5"></textarea>
                            </div>
                        </div>
                        <button class="btn1">Submit</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
 </section>

 
    </div>

  );
};

export default RecipeList;
