import React from "react";
import { List, Empty } from 'antd';
import PropTypes from 'prop-types';

import { MovieItem } from '../MovieItem'

import './MovieList.scss'


export default function MovieList({ data, isLoad, isError, onChangeRating}) {
    return (
        <div className="movie-list">
            {
                !isError ?
                    <List
                        grid={{
                            gutter: 6, column: 2
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <MovieItem
                                    item={item}
                                    isLoad={isLoad}
                                    onChangeRating={onChangeRating} />
                            </List.Item>
                        )}
                    /> : <Empty
                        className="movie-list-error"
                        description={
                            <span>
                                По Вашему запросу ничего не найдено.
                            </span>
                        } />
            }
        </div>
    )
}

MovieList.defaultProps = {
    data: [],
    isLoad: true,
    isError: false,
    onChangeRating: ()=>{}
};

MovieList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isLoad: PropTypes.bool,
    isError: PropTypes.bool,
    onChangeRating: PropTypes.func
};
