import PropTypes from "prop-types";
import { isValidParsed } from "../utils";

const Directions = ({ directions }) => {
  const parsedDirections = JSON.parse(directions);

  return (
    <div>
      {isValidParsed(parsedDirections) && (
        <div className="directions-container">
          <h3 className="directions-title">Directions:</h3>
          <ol>
            {parsedDirections.map((step, index) => (
              <li key={index} className="directions-list">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

Directions.propTypes = {
  directions: PropTypes.string.isRequired,
};

export default Directions;
