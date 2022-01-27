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
            data: JSON.parse(localStorage.getItem(this.#localStore)),
        }
    }

    componentDidMount() {
        this.getDataFromLocalStorage()
    }

    componentDidUpdate(prevProps) {
        const { dataLength, dataStatusLocalStorage, onChangeStatusStorage } = this.props;

        if (dataLength !== prevProps.dataLength) {
            this.getDataFromLocalStorage()
        }

        if (dataLength === 0) {
            this.getDataFromLocalStorage()
        }

        if (!dataStatusLocalStorage) {
            this.getDataFromLocalStorage()
            onChangeStatusStorage()
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

        if (!value) {
            this.deleteMovieFromLocalStorage(id)
        } else {
            this.changeMovieFromLocalStorage(id, value)
        }
    }

    changeMovieFromLocalStorage = (id, value) => {
        const { onChangeStatusStorage } = this.props;

        const arr = JSON.parse(localStorage.getItem(this.#localStore));
        const idx = arr.findIndex(elem => elem.id === id);
        const item = arr[idx]
        item.clientRating = value;
        localStorage.setItem(this.#localStore, JSON.stringify([...arr.slice(0, idx), item, ...arr.slice(idx + 1)]));
        onChangeStatusStorage()
    }

    deleteMovieFromLocalStorage = (id) => {
        const { onChangeStatusStorage } = this.props;

        const arr = JSON.parse(localStorage.getItem(this.#localStore));
        const idx = arr.findIndex(elem => elem.id === id);
        const item = arr[idx]
        item.clientRating = 0;
        localStorage.setItem(this.#localStore, JSON.stringify([...arr.slice(0, idx), ...arr.slice(idx + 1)]));
        onChangeStatusStorage()
    }

    render() {
        const { data } = this.state;

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
                                onChangeRating={this.onChangeRating} />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

MovieListRated.defaultProps = {
    dataLength: 1,
    dataStatusLocalStorage: true,
    onChangeStatusStorage: () => { }
};

MovieListRated.propTypes = {
    dataLength: PropTypes.number,
    dataStatusLocalStorage: PropTypes.bool,
    onChangeStatusStorage: PropTypes.func
};
