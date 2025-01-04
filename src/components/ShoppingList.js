const ShoppingList = ({ selectedRecipes }) => {
    const [ingredients, setIngredients] = useState([]);
  
    useEffect(() => {
      const combinedIngredients = selectedRecipes.reduce((acc, recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          acc[ingredient.name] = (acc[ingredient.name] || 0) + ingredient.quantity;
        });
        return acc;
      }, {});
  
      setIngredients(Object.entries(combinedIngredients));
    }, [selectedRecipes]);
  
    return (
      <div>
        <h3>Liste de courses</h3>
        <ul>
          {ingredients.map(([name, quantity]) => (
            <li key={name}>
              {name}: {quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  