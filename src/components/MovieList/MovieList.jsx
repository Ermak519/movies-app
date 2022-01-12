import React from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';
import { MovieItem } from '../MovieItem'

import './MovieList.scss'


export default function MovieList({data, isLoad}) {

    return (
        <div className="movie-list">
            <List
                grid={{
                    gutter: 6, column: 2
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <MovieItem 
                            item={item}
                            isLoad={isLoad} />
                    </List.Item>
                )}
            />
        </div>
    )
}

MovieList.defaultProps = {
    data: [],
    isLoad: true
};

MovieList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isLoad: PropTypes.bool
};
