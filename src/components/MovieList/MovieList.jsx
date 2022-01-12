import React from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';
import { MovieItem } from '../MovieItem'

import './MovieList.scss'


export default function MovieList({data, filterDescrText}) {

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
                            filterDescrText={filterDescrText} />
                    </List.Item>
                )}
            />
        </div>
    )
}

MovieList.defaultProps = {
    data: [],
    filterDescrText: ()=>{}
};

MovieList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    filterDescrText: PropTypes.func
};
