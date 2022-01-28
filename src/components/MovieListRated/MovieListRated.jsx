/* eslint-disable */

import React, { Component } from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';

import MovieDBService from '../../services/MovieDBService';
import { MovieItem } from '../MovieItem';

import './MovieListRated.scss'


export default class MovieListRated extends Component {
    #localStore = 'MovieAPI_DB';

    constructor(props) {
        super(props);
        this.movieDBService = new MovieDBService();

        this.state = {
            data: JSON.parse(localStorage.getItem(this.#localStore)),
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        const { rated, changeRatedStatus } = this.props;

        if (rated === 'edit') {
            this.getData();
            changeRatedStatus('ready');
        }
    }

    getData = () => {
        this.movieDBService.getLocalStorageMovies()
        .then((res) => {this.setState({data: res})})
    }

    onChangeRating = (id, value) => {
        const { changeSearchStatus } = this.props;
        const { data: arr } = this.state
        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = value
        this.updateMovieFromLocalStorage(id, value)
        changeSearchStatus('edit')
    }

    updateMovieFromLocalStorage = (id, value) => {
        const arr = JSON.parse(localStorage.getItem(this.#localStore));
        const idx = arr.findIndex(elem => elem.id === id);
        const item = arr[idx]
        item.clientRating = value;
        localStorage.setItem(this.#localStore, JSON.stringify([...arr.slice(0, idx), item, ...arr.slice(idx + 1)]));
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
    storage: '',
    rated: '',
    search: '',
    changeStorageStatus: ()=>{},
    changeRatedStatus:()=>{},
    changeSearchStatus:()=>{},
};

MovieListRated.propTypes = {
    storage: PropTypes.string,
    rated: PropTypes.string,
    search: PropTypes.string,
    changeStorageStatus: PropTypes.func,
    changeRatedStatus: PropTypes.func,
    changeSearchStatus: PropTypes.func,
};
