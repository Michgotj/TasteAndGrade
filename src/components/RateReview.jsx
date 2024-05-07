import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = "http://localhost:800/recipes";

const RateReview = ({ recipe, recipeId, setShowUsersReviews }) => {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [review, setReview] = useState("");
  const [rateCount, setRateCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [initialStarsColor, setInitialStarsColor] = useState([]);
  const [isRateReviewFormOpen, setIsRateReviewFormOpen] = useState(false);

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  useEffect(() => {
    const createStar = (averageRating) => {
      const rating = Math.round(averageRating);

      const DEFAULT_COLOR = "#ccc";
      const YELLOW_COLOR = "#f7bd34";

      const yellowStars = Array.from({ length: rating }, (_, index) => ({
        rating: index,
        color: YELLOW_COLOR,
      }));

      const defaultStars = Array.from({ length: 5 - rating }, (_, index) => ({
        rating: index + rating,
        color: DEFAULT_COLOR,
      }));

      const starsArray = [...yellowStars, ...defaultStars];
      const reOrderedStarsArray = [
        ...starsArray.slice(0, starsArray.length - defaultStars.length),
        ...defaultStars,
      ];

      return reOrderedStarsArray;
    };

    const axiosRatingReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/${recipeId}/reviews`);
        if (Array.isArray(response.data)) {
          const ratings = response.data.map((review) => review.rating);

          if (Array.isArray(ratings)) {
            const average =
              ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
            setAverageRating(average);

            const starsArray = createStar(average);

            const newStarsColor = stars.map((_, index) =>
              index < starsArray.length && starsArray[index].color === "#f7bd34"
                ? "#f7bd34"
                : "#ccc"
            );

            setInitialStarsColor(newStarsColor);
            setReviewCount(response.data.length);
          } else {
            console.error("Error: Ratings data is not an array");
          }
        }
      } catch (error) {
        console.error("Error fetching rating:", error.message);
      }
    };

    if (recipeId) {
      axiosRatingReviews();
    }
  }, [recipeId, stars]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setRating(0);
      setReview("");
      setIsRateReviewFormOpen(false);
      setRateCount(rateCount + 1);
      setReviewCount(reviewCount + 1);
      setShowUsersReviews(true);
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  if (!recipe) {
    return null;
  }

  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <div className="average-stars-rating-container">
        <div className="average-rating">
          {averageRating !== undefined
            ? averageRating.toFixed(1)
            : averageRating}
        </div>
        <div className="average-stars">
          {initialStarsColor && initialStarsColor.length > 0
            ? initialStarsColor.map((starColor, index) => (
                <span key={index} style={{ color: starColor }}>
                  ★
                </span>
              ))
            : null}
        </div>
      </div>
      <div className="review-count-container">
        <div className="review-count">{`Reviews (${reviewCount} Comments)`}</div>
        <button
          className="add-a-review-button"
          onClick={() => {
            setShowUsersReviews(true);
            setIsRateReviewFormOpen((prev) => !prev);
            if (!isRateReviewFormOpen) {
              setShowUsersReviews(false);
            }
          }}
        >
          {isRateReviewFormOpen ? "Close Review" : "Add a Review "}
        </button>
      </div>
      {isRateReviewFormOpen && (
        <form onSubmit={handleSubmit} className="rating-form-container">
          <label htmlFor="rating" className="your-rating">
            Your Rating:
          </label>
          <div className="star-rating-review">
            {stars.map((star) => (
              <span
                key={star}
                style={{ color: star <= rating ? "#f7bd34" : "DEFAULT_COLOR" }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            id="review"
            name="review"
            value={review}
            onChange={handleReviewChange}
            className="review-text-area"
            placeholder="Enter your review here..."
          ></textarea>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

RateReview.propTypes = {
  recipe: PropTypes.object.isRequired,
  recipeId: PropTypes.string,
  setShowRatingReviewFor: PropTypes.func.isRequired,
  setShowUsersReviews: PropTypes.func.isRequired,
};

export default RateReview;
