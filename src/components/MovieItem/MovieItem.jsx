import React from "react";
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';
import format from 'date-fns/format'

import { GenreList } from "../GenreList";
import { ClientRating } from "../ClientRating";
import { MovieRating } from "../MovieRating";

import './MovieItem.scss'

const { Title, Text } = Typography;

export default function MovieItem({ item, isLoad }) {
    const { title, descr, img, genres, date, rating } = item;
    const filterDescrText = (str) => str === null ? null : str.split(' ').filter((elem, i) => i < 25).join(' ');
    const newDescr = filterDescrText(descr);
    const picture = `http://image.tmdb.org/t/p/w500${img}`;

    let formatDate;

    try {
        formatDate = format(new Date(date), 'PPP');
    } catch (error) {
        formatDate = undefined
    }

    return (
        <div className="movie-list-item">
            <Card hoverable
                style={{
                    width: 454,
                    height: 281,
                    display: "flex",
                }}
                cover={<img alt={title || 'loading'} src={picture} style={{ width: 183, height: 281 }} />}
                loading={isLoad}
            >
                <div className="movie-list-item__wrapper">
                    <div className="movie-list-item__main">
                        <div className="movie-list-item__header">
                            <Title className="movie-list-item__title" level={4}>{title}</Title>
                            <div className="movie-list-item__rate">
                                <MovieRating
                                    rating={rating}
                                />
                            </div>
                        </div>
                        <div className="movie-list-item__date">
                            <Text type="secondary">{formatDate ?? 'coming soon'}</Text>
                        </div>
                        <div className="movie-list-item__genres">
                            <GenreList genres={genres} />
                        </div>
                        <Text className="movie-list-item__descr">{`${newDescr} ...`}</Text>
                    </div>
                    <div className="movie-list-item__rating">
                        <ClientRating />
                    </div>
                </div>

            </Card>
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