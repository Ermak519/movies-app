import React from "react";
import shortid from 'shortid';

import { Tag, Space } from 'antd';
import PropTypes from 'prop-types';

import './GenreList.scss'

export default function GenreList({ genres: genresID, genresList }) {
    const { genres } = genresList;

    const genresName = genres.filter((genre) => genresID.includes(genre.id))

    return (
        <Space size={1} className="genre-list-space" >
            {
                genresName.map(({ name }) => <Tag
                    key={`genre_${shortid.generate()}`}
                    color="green">{name}
                </Tag>)
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