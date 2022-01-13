import React from "react";
import PropTypes from "prop-types";


import './MovieRating.scss'

export default function MovientRating({ rating }) {
    return <span>
        {rating}
    </span>
}

MovientRating.defaultProps = {
    rating: 0,
};

MovientRating.propTypes = {
    rating: PropTypes.number,
};