import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllMeals from './AllMeals';
import { useNavigate } from 'react-router-dom';

const MealPlanner = ({ recipe }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const addRecipeToPlan = async(recipe, selectedDate) => {
 
    const payload = {
    recipeId:recipe.id, 
    recipe_title:recipe.title,
    planDate:selectedDate.toISOString().split('T')[0], // Format YYYY-MM-DD
    }
    axios.post(`http://localhost:5000/meals`, payload)
    .then(() => alert('repas planifié!'),
  console.log(payload),
navigate(<AllMeals recipe={recipe}/>))
    .catch((error) => console.error('Error planning meal:', error));
      };

    

  return (
    <div className="container">
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h3>Planifier cette recette pour le {selectedDate.toDateString()}</h3>
      <button
        className="btn btn-primary"
        onClick={() => addRecipeToPlan(recipe, selectedDate)}
      >
        Ajouter
      </button>
      
    </div>
 

  
  );
};
export default MealPlanner;
