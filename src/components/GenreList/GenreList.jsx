import React from "react";
import shortid from 'shortid';

import { Tag, Space } from 'antd';
import PropTypes from 'prop-types';

export default function GenreList({ genres }) {
    const genresArr = genres.map((genre) => <Tag key={`genre_${shortid.generate()}`}>{genre}</Tag>)

    return (
        <Space size={1} >
            {genresArr}
        </Space>
    )
}

GenreList.defaultProps = {
    genres: [],
};

GenreList.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.any),
};