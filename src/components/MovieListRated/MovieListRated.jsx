import React, { Component } from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';

import { MovieItem } from '../MovieItem';
// import { PaginationList } from "../PaginationList";

import './MovieListRated.scss'


export default class MovieListRated extends Component {
    #localStore = 'MovieAPI_DB';

    constructor(props) {
        super(props);


        this.state = {
            status: '', // empty, error, loading, loading-cards, loaded
            // totalPages: null,
            data: JSON.parse(localStorage.getItem(this.#localStore)),
        }
    }

    componentDidMount() {
        this.getDataFromLocalStorage()
    }

    componentDidUpdate(prevProps) {
        const { dataLength } = this.props;

        if (dataLength !== prevProps.dataLength) {
            this.getDataFromLocalStorage()
        }
    }

    getDataFromLocalStorage = () => {
        this.setState({
            data: JSON.parse(localStorage.getItem(this.#localStore))
        })
    }

    onChangeRating = (id, value) => {
        const { data: arr } = this.state
        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = value
        this.changeMovieFromLocalStorage(id, value)
    }

    // eslint-disable-next-line no-unused-vars
    changeMovieFromLocalStorage = (id, value) => {
        const arr = JSON.parse(localStorage.getItem(this.#localStore));
        const idx = arr.findIndex(elem => elem.id === id);
        const item = arr[idx]
        console.log(item)
        // const  movieLSItems = JSON.parse(localStorage.getItem(this.#localStore));
        // const check = movieLSItems.find(obj => obj.id === id)

        // if(!check) localStorage.setItem(this.#localStore, JSON.stringify([...movieLSItems, item]));
            
        // const newItem = item;
        // newItem.clientRating = value;
        // localStorage.setItem(this.#localStore, JSON.stringify([...movieLSItems.slice(0, idx), newItem, ...movieLSItems.slice(idx+1)]));
    }

    render() {
        const { status, data } = this.state;

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
    dataLength: 1,
};

MovieListRated.propTypes = {
    dataLength: PropTypes.number,
};
