
import axios from "axios";
import React,{useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteRecipe =()=> {
    const [selectedRecipes, setSelectedRecipes]=useState([]);//recettes sélectionnés
    const [recipes, setRecipes]=useState([]);

    /*  <div className='Search_bar'><SearchBar recipes={selectedRecipes}/></div>*/
    useEffect (() => {//récupérer les recettes
            console.log(selectedRecipes)
            axios.get('http://localhost:5000/recipes')
              .then((response) => setRecipes(response.data))
              .catch((error) => console.error('Error adding recipe:', error));
            }, []);
    const handleSelect = (recipeId) =>{
        setSelectedRecipes((prev) => prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev,recipeId]);
    };

    const handleDelete = async (e) => {
       e.preventDefault();
       try{
           await
        console.log(selectedRecipes);
        axios.delete('http://localhost:5000/recipes',{data:{ids:selectedRecipes},} );//Envoi les ids au backend
        //maj de la liste des recettes après suppression
        setRecipes((prev) => prev.filter((recipe) => !selectedRecipes.includes(recipe.id))
     );
     setSelectedRecipes([]); // réinitialiser les sélections
           alert('Recipe deleted!');}
          catch(error) {console.error('Error deleting recipe:', error);}
      };
    


    return (
        <div>
          <h2> Supprimer des recettes </h2>
          
          <ul>
          {recipes.map((recipe) =>(
          <li key={recipe.id}>
            <input
            type ="checkbox"
            name="recipe"
            value ={recipe.id}
            onChange={()=> handleSelect(recipe.id)}
            checked={selectedRecipes.includes(recipe.id)}
              />
          {recipe.title}
         </li>  
          ))}</ul> 
         
          <button onClick={handleDelete} disabled={selectedRecipes.length===0}>Delete the recipe(s) selected</button>
        </div>
      );

}
export default DeleteRecipe;