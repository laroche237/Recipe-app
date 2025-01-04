import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from './Comments';
import MealPlanner from './MealPlanner';
import { category } from './AddRecipe';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(JSON.stringify(''));


  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]); // Stocker la photo sélectionnée
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setSelectedCategory(response.data.category || JSON.stringify(''));
        setEditedRecipe(response.data); // Préremplir les champs pour l'édition
        console.log('API response:', response.data.category);
      })
      .catch((error) => {
        console.error('Error fetching recipe details:', error);
      });
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('title', editedRecipe.title || '');
    formData.append('description', editedRecipe.description || '');
    formData.append('ingredients', editedRecipe.ingredients || '');
    formData.append('instructions', editedRecipe.instructions || '');
    formData.append('cooking_time', editedRecipe.cooking_time || '0');
    formData.append('category', selectedCategory );
    if (newPhoto) {
      formData.append('photo', newPhoto); // Ajouter la photo si elle est mise à jour
    }
    console.log([...formData.entries()]); 
    axios.put(`http://localhost:5000/recipes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }, 
    console.log(formData),)
      .then(() => {
        alert('Recipe modified!');
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
      });
  };

  if (!recipe) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4"> {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedRecipe.title || ''}
                onChange={handleInputChange}
                className="form-control"
              />
            ) : (
              recipe.title
            )}</h1>
           {isEditing ? (
            <>
              <div className="mb-3">
                <label>Nouvelle photo :</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handlePhotoChange}
                  className="form-control"
                />
              </div>
            </>
          ) : (
            recipe.photo && (
              <img
                src={recipe.photo}
                alt={recipe.title}
                className="img-fluid rounded mx-auto d-block mb-4"
                style={{ minWidth: '200px' }}
              />
            )
          )}{isEditing ? (
        <>
         <div className="mb-3">
            <label>Category:</label>
            <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {category.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedRecipe.description || ''}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Ingrédients:</label>
            <textarea
              name="ingredients"
              value={editedRecipe.ingredients || ''}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Instructions:</label>
            <textarea
              name="instructions"
              value={editedRecipe.instructions || ''}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Temps de préparation (minutes):</label>
            <input
              type="number"
              name="cooking_time"
              value={editedRecipe.cooking_time || ''}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </>
      ) : (
        <>
        <p><strong>Category:</strong> {recipe.category|| 'Non spécifiée'}</p>
          <p><strong>Description:</strong> {recipe.description || 'Non spécifiée'}</p>
          <p><strong>Ingrédients:</strong> {recipe.ingredients || 'Non spécifiés'}</p>
          <p><strong>Instructions:</strong> {recipe.instructions || 'Non spécifiées'}</p>
          <p><strong>Temps de préparation:</strong> {recipe.cooking_time || 'Non spécifié'} minutes</p>
        </>
      )}

  </div>
  <div className="card-footer text-center">
          {isEditing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Enregistrer
              </button>
              <button className="btn btn-secondary" onClick={handleEditToggle}>
                Annuler
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEditToggle}>
              Modifier
            </button>
          )}
        </div>
      </div>
      <div className='container justify-content-between align-items-center'>
      <Comments recipeId={id} />
      <br/>
      <MealPlanner recipe={recipe} />
      </div>
    </div>
  );
};


export default RecipeDetails;
