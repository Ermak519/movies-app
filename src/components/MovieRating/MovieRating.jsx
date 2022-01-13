import React from "react";
import PropTypes from "prop-types";


import './MovieRating.scss'

export default function MovientRating({ rating }) {
    return <div className="movie-rating">
        {rating}
    </div>
}

MovientRating.defaultProps = {
    rating: 0,
};

MovientRating.propTypes = {
    rating: PropTypes.number,
};