import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes, setCurrentPage, setSearchQuery } from '../redux/recipesSlice'; 
import { Link } from 'react-router-dom'; 
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { list, status, error, currentPage, recipesPerPage, searchQuery } = useSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);


  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

 
  const filteredRecipes = list.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="homepage">
      <h1 style={{fontSize:'40px',color:'orange'}}>Welcome to the Recipe App</h1>
      <p>Find your favorite recipes below:</p>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by recipe name or cuisine..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      
      <div className="recipe-list">
        {currentRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image || 'https://via.placeholder.com/150'} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <Link to={`/recipe/${recipe.id}`}>
              <button
                style={{
                  backgroundColor: 'orange',
                  padding: '10px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: '600',
                }}
                id="lirecipe"
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
