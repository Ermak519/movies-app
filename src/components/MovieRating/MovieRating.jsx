import React from 'react';
import PropTypes from 'prop-types';

import './MovieRating.scss';

export default function MovientRating({ rating }) {
  const colors = {
    red: '#E90000',
    orange: '#E97E00',
    yellow: '#E9D100',
    green: '#66E900',
  };

  const { red, orange, yellow, green } = colors;

  let ratingColor;

  if (rating < 3) ratingColor = red;
  if (rating >= 3 && rating < 5) ratingColor = orange;
  if (rating >= 5 && rating < 7) ratingColor = yellow;
  if (rating >= 7) ratingColor = green;

  return (
    <div className="movie-rating" style={{ borderColor: ratingColor }}>
      {rating}
    </div>
  );
}

MovientRating.defaultProps = {
  rating: 0,
};

MovientRating.propTypes = {
  rating: PropTypes.number,
};
