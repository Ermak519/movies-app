import React from "react";

import { Tag } from 'antd';
import PropTypes from 'prop-types';

export default function GenreList({ genres }) {
    return (
        <>
            <Tag>{genres[0]}</Tag>
            <Tag>{genres[1]}</Tag>
        </>
    )
}

GenreList.defaultProps = {
    genres: [],
};

GenreList.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.any),
};