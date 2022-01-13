import React from "react";
import PropTypes from "prop-types";


import './MovieRating.scss'

export default function MovientRating({ rating }) {
    const movieRating = (rate) => ((rate.toFixed(1) * 10) / 100).toFixed(1);
    const newRate = movieRating(rating);

    return <div className="movie-rating">
        {newRate}
    </div>
}

MovientRating.defaultProps = {
    rating: 0,
};

MovientRating.propTypes = {
    rating: PropTypes.number,
};