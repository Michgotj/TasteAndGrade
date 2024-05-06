import React from "react";
import WelcomePageImage from "../backend/images/WelcomePageImg.jpeg";

const WelcomePage = () => {
  return (
    <div className="welcome-page-container">
      <div className="welcome-page-column">
        <p>
          Welcome to our dynamic recipe community! Get ready to immerse yourself
          in a world of culinary delights where innovation meets tradition, and
          every dish is a journey waiting to be explored. Our platform is
          designed to bring together passionate food enthusiasts like you to
          discover innovative cooking techniques, exchange valuable tips, and
          embark on flavorful adventures that tantalize your taste buds.
        </p>
        <p>
          At our community, you can connect with like-minded food lovers from
          around the globe, share your culinary creations, rate recipes, and
          gather inspiration for your next cooking escapade. Whether you're a
          seasoned chef or an aspiring home cook, our platform offers a wealth
          of resources to help you craft a personalized cooking journey tailored
          to your unique tastes and preferences.
        </p>
        <p>
          Browse through our extensive recipe collection, where every dish tells
          a story and every flavor ignites inspiration. We're excited to have
          you on board, and we wish you happy cooking and unforgettable culinary
          adventures! We're excited to have you on board, and we wish you happy
          cooking and unforgettable culinary adventures!
        </p>
      </div>
      <img src={WelcomePageImage} alt="Photogenic Dish" />
    </div>
  );
};

export default WelcomePage;
