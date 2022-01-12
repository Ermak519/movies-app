import React from "react";
import { List, Alert } from 'antd';
import PropTypes from 'prop-types';
import { MovieItem } from '../MovieItem'

import './MovieList.scss'


export default function MovieList({ data, isLoad, isError }) {

    const loadedList = !isError ?
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
        /> : null

    const errorMsg = isError ?
        <Alert
            message="Ой, что-то не так."
            description="Хм, похоже сервер не справился с нагрузкой, пытаемся решить проблему..."
            type="error"
            showIcon
        /> : null

    return (
        <div className="movie-list">
            {loadedList}
            {errorMsg}
        </div>
    )
}

MovieList.defaultProps = {
    data: [],
    isLoad: true,
    isError: false
};

MovieList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isLoad: PropTypes.bool,
    isError: PropTypes.bool
};
