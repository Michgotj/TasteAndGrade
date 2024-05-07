import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = "http://localhost:800/recipes";

const UsersReviews = ({ recipeId, isReviewOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const axiosReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/${recipeId}/reviews`);
        setReviews(response.data.reverse());
      } catch (error) {
        console.error("Error axios reviews:", error.message);
        setError(error.message || "Failed to axios reviews");
      } finally {
        setIsLoading(false);
      }
    };

    axiosReviews();
  }, [recipeId]);

  return (
    <div className={`users-reviews ${isReviewOpen ? "open" : ""}`}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {reviews.length > 0 && (
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p>{review.review}</p>
              <span className="reviewers-star-rating">
                {"★".repeat(review.rating)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

UsersReviews.propTypes = {
  recipeId: PropTypes.string.isRequired,
  isReviewOpen: PropTypes.bool.isRequired,
};

export default UsersReviews;
