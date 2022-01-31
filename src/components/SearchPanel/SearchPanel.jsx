import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import debounce from 'lodash.debounce';

import './SearchPanel.scss';

export default function SearchPanel({ onSearchMovie }) {
  const search = debounce(onSearchMovie, 2000);

  const onSearch = (event) => {
    search(event.target.value);
  };

  return (
    <div className="search-panel">
      <Input className="search-panel__input" placeholder="Type to search..." onChange={onSearch} />
    </div>
  );
}

SearchPanel.defaultProps = {
  onSearchMovie: () => { },
};

SearchPanel.propTypes = {
  onSearchMovie: PropTypes.func,
};
