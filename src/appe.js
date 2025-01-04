const RecipeCard = ({ recipe, onSave }) => {
  return (
    <div>
      <h4>{recipe.title}</h4>
      <button onClick={() => onSave(recipe)}>Enregistrer</button>
    </div>
  );
};

const SavedRecipes = ({ savedRecipes }) => (
  <div>
    <h3>Mes Recettes Enregistrées</h3>
    <ul>
      {savedRecipes.map((recipe, index) => (
        <li key={index}>{recipe.title}</li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const saveRecipe = (recipe) => {
    setSavedRecipes([...savedRecipes, recipe]);
  };

  return (
    <div>
      <RecipeCard recipe={{ title: 'Recette 1' }} onSave={saveRecipe} />
      <SavedRecipes savedRecipes={savedRecipes} />
    </div>
  );
};
