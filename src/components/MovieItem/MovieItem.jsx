import React from "react";
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';
import format from 'date-fns/format'

import { GenreList } from "../GenreList";
// import { MovieRating } from "../MovieRating";

import './MovieItem.scss'

const { Title, Text } = Typography;

export default function MovieItem({ item, isLoad }) {
    const { title, descr, img, genres, date } = item;
    const filterDescrText = (str) => str === null ? null : str.split(' ').filter((elem, i) => i < 20).join(' ');
    const newDescr = filterDescrText(descr)

    const formatDate = format(new Date(date), 'PPP');
    const picture = `http://image.tmdb.org/t/p/w500${img}`;

    const card =
        <Card hoverable
            style={{
                width: 454,
                height: 281,
                display: "flex",
                overflow: "hidden"
            }}
            cover={<img alt={title || 'loading'} src={picture} style={{ width: 183, height: 281 }} />}
            loading={isLoad}
        >
            <div className="movie-list-item__wrapper">
                <div className="movie-list-item__main">
                    <div className="movie-list-item__header">
                        <Title className="movie-list-item__title" level={4}>{title}</Title>
                        <div className="movie-list-item__rate">Rating</div>
                    </div>
                    <div className="movie-list-item__date">
                        <Text type="secondary">{formatDate}</Text>
                    </div>
                    <div className="movie-list-item__genres">
                        <GenreList genres={genres} />
                    </div>
                    <Text className="movie-list-item__descr">{`${newDescr} ...`}</Text>
                </div>
            </div>
            {/* <MovieRating className="movie-list-item__rating" /> */}
        </Card>



    return (
        <div className="movie-list-item">
            {card}
        </div>
    );
}

MovieItem.defaultProps = {
    item: {},
    isLoad: true
};

MovieItem.propTypes = {
    item: PropTypes.objectOf(PropTypes.any),
    isLoad: PropTypes.bool
};