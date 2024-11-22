import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { fetchRecipes } from '../redux/recipesSlice'; 
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.recipes);

  const recipe = list.find((recipe) => recipe.id === parseInt(id));

  useEffect(() => {
    if (status === 'idle' && !recipe) {
      dispatch(fetchRecipes()); 
    }
  }, [dispatch, status, recipe]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return recipe ? (
    <div className="recipe-details">
          <div style={{display:'flex',flexDirection:'column',width:'90%'}}>
              <h1>{recipe.name}</h1>
              <img src={recipe.image} alt={recipe.name} style={{width:'900px'}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Time:</strong> {recipe.prepTimeMinutes+recipe.cookTimeMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </div>
      </div>
  ) : (
    <p>Recipe not found.</p>
  );
};

export default RecipeDetails;
