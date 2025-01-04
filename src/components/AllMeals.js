import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
 // const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/meals')
      .then((response) => setMeals(response.data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className="container">
      
      <h2 >Repas Planifiés</h2>
    
        {meals.map((meal) => (
          <div className="col-md-4 mb-4 list-group-item" key={meal.id}  >
        
             <div className="card-body text-white">
                <h4 className="card-title">{meal.recipe_title}</h4>
                <p className="card-text">{meal.plan_date}</p>
                <button onClick={() => window.location.href = `/recipe/${meal.recipe_id}`}>
           Voir la recette
          </button>
          </div>
          </div>
        ))}
    
    </div>
  );
};

export default AllMeals;
