import React from "react";

import { Tag, Space } from 'antd';
import PropTypes from 'prop-types';

export default function GenreList({ genres }) {
    return (
        <Space size={1}>
            <Tag>{genres[0]}</Tag>
            <Tag>{genres[1]}</Tag>
        </Space>
    )
}

GenreList.defaultProps = {
    genres: [],
};

GenreList.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.any),
};