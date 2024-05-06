import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./backend/images/logo.png";
import RecipeSearch from "./components/RecipeSearch";
import WelcomePage from "./components/WelcomePage";
import SocialNetworkBar from "./components/SocialNetworkBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [title, setTitle] = useState("Taste and Grade");

  useEffect(() => {
    const axiosRecipeData = async () => {
      try {
        const response = await axios.get("http://localhost:443/recipes");
        setRecipeData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    axiosRecipeData();
  }, []);

  const handleSelectRecipe = (selectedOption) => {
    setSelectedRecipe(selectedOption);
    setShowWelcomeText(false);
    setTitle("Bon Appétit ‌‌󠁩 󠁩󠁩 ‌‌󠁩 ‌‌󠁩 󠁩󠁩‌‌󠁩 󠁩󠁩‌‌󠁩 󠁩󠁩 󠁩󠁩ᡣ𐭩"); // Using non-visible characters to create space in the title:
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <body>
      <div className="app-container">
        <header className="header">
          <h1>{title}</h1>
        </header>
        {Boolean(!selectedRecipe) && <img src={logo} alt="logo" className="logo" />}
        <div>
          <RecipeSearch
            selectedRecipe={selectedRecipe}
            onSelectRecipe={handleSelectRecipe}
            recipeData={recipeData}
          />
        </div>
        {showWelcomeText && (
          <div className="columns">
            <WelcomePage showWelcomeText={showWelcomeText} />
            <SocialNetworkBar />
          </div>
        )}
      </div>
    </body>
  );
};

export default App;
