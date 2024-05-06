import React from "react";
import PropTypes from "prop-types";
import { isValidParsed } from "../utils";

const Ingredients = ({ ingredients }) => {
  const parsedIngredients = JSON.parse(ingredients);

  return (
    <div className="ingredients-container">
      {isValidParsed(parsedIngredients) && (
        <div>
          <h2 className="ingredients-title">Ingredients:</h2>
          <ul>
            {parsedIngredients.map((ingredient, index) => (
              <li key={index} className="ingredients-list">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
};

export default Ingredients;
