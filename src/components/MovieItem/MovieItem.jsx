import React from "react";
import { Card } from 'antd';
import PropTypes from 'prop-types';

import './MovieItem.scss'

const { Meta } = Card;

export default function MovieItem({item}) {
    const { title, descr, img } = item
    return (
        <div className="movie-list-item">
            <Card hoverable
                style={{ width: 340, display: "flex" }}
                cover={<img alt={title} src={img} />}
            ><Meta title={title} description={descr} />
            </Card>
        </div>
    )
}

MovieItem.defaultProps = {
    item: {},
};

MovieItem.propTypes = {
    item: PropTypes.objectOf(PropTypes.any),
};