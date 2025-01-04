import React, { useState } from 'react';
import axios from 'axios';
import PhotoUpload from './PhotoUpload.js';
//import { type } from '@testing-library/user-event/dist/type';

const AddRecipe = () => {
const category = ["all", "entree", "resistance", "dessert"];
  //const [selectedCategory, setSelectedCategory]= useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    cooking_time: '',
    category: [],
    photo: null,
  });
  
  const handleChange = (e) => {
    const {name, value ,checked}=e.target;
    /*setSelectedCategory((prevSelected) => prevSelected.includes(e.target.value) ?
    prevSelected.filter((category)=> category !== e.target.value )
  : 
  [...prevSelected, e.target.value] );*/
  if( name === "category[]"){
    setForm((prevForm) =>({
      ...prevForm, category:checked ?  [...(prevForm.category || []), value] // Ajoute si coché
      : 
      (prevForm.category ||[]).filter((cat) =>  cat !== value), //retire si décoché
    }) );
  }
  else{
    //Pour les autres types d'input
    setForm((prevForm) => ({
      ...prevForm, [name]: value,//mets les autres champs à jour
    }));
  }

    
  };

  const handlePhotoUpload = (file) => {
    setForm((prevForm) => ({
      ...prevForm,
      photo: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  if (!form.photo) {
    alert('Veuillez sélectionner une photo');
    return;
  }

  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (key === "category") {
      formData.append(key, JSON.stringify(value));
    } else if (key === "photo") {
      formData.append(key, value); // Ajout du fichier photo
    } else {
      formData.append(key, value);
    }
  });

  axios.post('http://localhost:5000/recipes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
      .then(() => alert('Recipe added!'))
      .catch((error) => console.error('Error adding recipe:', error));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            name="ingredients"
            className="form-control"
            placeholder="Ingredients"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            name="instructions"
            className="form-control"
            placeholder="Instructions"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Cooking Time</label>
          <input
            type="number"
            name="cooking_time"
            className="form-control"
            placeholder="Cooking Time (mins)"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <h5>Categories</h5>
          {category.map((cat, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="category[]"
                value={cat}
                checked={form.category.includes(cat)}
                onChange={handleChange}
              />
              <label className="form-check-label">{cat}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <PhotoUpload name="photo" onUpload={handlePhotoUpload} />
        </div>
        <button type="submit" className="btn btn-success">
          Add Recipe
        </button>
      </form>
    </div>
  );
};
export const category = ["all", "entree", "resistance", "dessert"];
export default AddRecipe;
