/* eslint-disable */



import React from "react";
import shortid from 'shortid';

import { Tag, Space } from 'antd';
import PropTypes from 'prop-types';

export default function GenreList({ genres: genresID, genresList }) {
    const { genres } = genresList;

    const genresName = genres.filter((genre) => genresID.includes(genre.id))

    return (
        <Space size={1} >
            {
                genresName.map(({ name }) => <Tag key={`genre_${shortid.generate()}`}>{name}</Tag>)
            }
        </Space>
    )
}

GenreList.defaultProps = {
    genres: [],
    genresList: {}
};

GenreList.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.any),
    genresList: PropTypes.objectOf(PropTypes.array)
};