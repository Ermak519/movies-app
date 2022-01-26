import React, { Component } from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';

import { MovieItem } from '../MovieItem';
// import { PaginationList } from "../PaginationList";

import './MovieListRated.scss'


export default class MovieListRated extends Component {
    constructor({localStorageData}) {
        super();

        this.localStorageData = localStorageData

        this.state = {
            status: '', // empty, error, loading, loading-cards, loaded
            // totalPages: null,
            data: null,
        }
    }


    onChangeRating = (id, value) => {
        const { data: arr } = this.state
        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = localStorage.setItem(`movie-rating_${id}`, value)
        localStorage.setItem(`movie_${id}`, JSON.stringify(item))
        this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] })
    }

    render() {
        const { status , data} = this.state;

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
                                    status={status}
                                    onChangeRating={this.onChangeRating} />
                            </List.Item>
                        )}
                    />
                {/* <PaginationList
                    totalPages={totalPages}
                    currentPage={currentPage}
                    status={status}
                    onChangeCurrentPage={onChangeCurrentPage} /> */}
            </div>
        )
    }
}

MovieListRated.defaultProps = {
    // localStorageLength: 1,
    localStorageData: []
};

MovieListRated.propTypes = {
    // localStorageLength: PropTypes.number,
    localStorageData: PropTypes.arrayOf(PropTypes.object)
};
