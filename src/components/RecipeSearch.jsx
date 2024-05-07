import React, { useState, useEffect } from "react";
import Select from "react-select";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import RateReview from "./RateReview";
import UsersReviews from "./UsersReviews";
import axios from "axios";

const RecipeSearch = ({ recipeData, onSelectRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [recipeImage, setRecipeImage] = useState(null);
  const [showUsersReviews, setShowUsersReviews] = useState(true);
  const [recipesByCategory, setRecipesByCategory] = useState({
    Meat: [],
    Fish: [],
    Vegetables: [],
    Desserts: [],
  });

  const UPLOAD_API_URL = "http://localhost:800/recipes/upload";

  useEffect(() => {
    const categorizedRecipes = {
      Meat: [],
      Fish: [],
      Vegetables: [],
      Desserts: [],
    };

    recipeData.forEach((recipe) => {
      if (
        recipe.category &&
        categorizedRecipes.hasOwnProperty(recipe.category)
      ) {
        categorizedRecipes[recipe.category].push({
          label: recipe.title,
          value: recipe.id,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
        });
      } else if (!recipe.category) {
        console.warn(`Category is null for recipe: ${recipe.title}`);
      } else {
        console.warn(
          `Invalid category found: ${recipe.category} for recipe: ${recipe.title}`
        );
      }
    });
    setRecipesByCategory(categorizedRecipes);
  }, [recipeData]);

  useEffect(() => {
    const axiosRecipeImage = async () => {
      try {
        if (Boolean(selectedRecipe) && selectedRecipe.label) {
          const imageName = `${selectedRecipe.label}.jpeg`;
          const imageUrl = `${UPLOAD_API_URL}/${imageName}`;
          const response = await axios.get(imageUrl, {
            responseType: "blob",
          });

          if (response.status !== 200) {
            throw new Error("Failed to fetch image: " + response.statusText);
          }
          const imageData = await response.data;
          setRecipeImage(URL.createObjectURL(imageData));
        }
      } catch (error) {
        console.error("Error axios recipe image:", error.message);
      }
    };

    axiosRecipeImage();
  }, [selectedRecipe]);

  const handleSelectRecipe = (selectedOption) => {
    setSelectedRecipe(selectedOption);
    onSelectRecipe(selectedOption);
  };

  const dropDownStyles = {
    control: (provided) => ({
      ...provided,
      border: "0.1rem solid black",
      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)",
      fontSize: "1rem",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      fontSize: "1.2rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#999" : "transparent",
      border: "0.1rem solid rgba(0, 0, 0, 0.1)",
      fontSize: "0.9rem",
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.9rem",
    }),
  };

  const getOptionLabel = (option) => ({
    ...option,
    label: (
      <span style={{ color: "#333", fontWeight: "bold" }}>{option.label}</span>
    ),
  });

  return (
    <div className="recipe-search-container">
      {/* This div contains a Bootstrap row */}
      <div className="row">
        {/* This div uses Bootstrap's col-md-6 class */}
        <div className="col-md-6">
          <form className="search-form">
            <Select
              options={[
                { label: "Meat", options: recipesByCategory.Meat },
                { label: "Fish", options: recipesByCategory.Fish },
                { label: "Vegetables", options: recipesByCategory.Vegetables },
                { label: "Desserts", options: recipesByCategory.Desserts },
              ].map(getOptionLabel)}
              onChange={handleSelectRecipe}
              placeholder={
                selectedRecipe.label
                  ? "Choose another recipe..."
                  : "Choose a recipe..."
              }
              noOptionsMessage={() => "No options found"}
              value={null}
              styles={dropDownStyles}
            />
          </form>
          {Boolean(selectedRecipe.value) && (
            <div>
              <Ingredients ingredients={selectedRecipe?.ingredients || []} />
              <Directions directions={selectedRecipe?.directions || []} />
            </div>
          )}
        </div>
        {Boolean(selectedRecipe.label) && (
          <div className="col-md-6">
            <div>
              <div className="recipe-title-container">
                <h1>{selectedRecipe.label}</h1>
                <div className="recipe-image-container">
                  <img
                    src={recipeImage}
                    alt={`${selectedRecipe.label}`}
                    className="recipe-image"
                  />
                </div>
              </div>
              <RateReview
                recipe={selectedRecipe}
                recipeId={selectedRecipe.value.toString()}
                setShowUsersReviews={setShowUsersReviews}
              />
              {showUsersReviews && (
                <UsersReviews recipeId={selectedRecipe.value.toString()} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
