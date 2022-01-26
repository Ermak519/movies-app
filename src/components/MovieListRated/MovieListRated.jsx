import React, { Component } from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';

import MovieDBService from '../../services/MovieDBService';
import { MovieItem } from '../MovieItem';
// import { PaginationList } from "../PaginationList";

import './MovieListRated.scss'


export default class MovieListRated extends Component {
    constructor(props) {
        super(props);

        this.movieDBService = new MovieDBService();

        this.state = {
            status: '', // empty, error, loading, loading-cards, loaded
            // totalPages: null,
            data: JSON.parse(localStorage.getItem('MovieAPI_DB')),
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
        this.movieDBService.getMovieFromLocalStorage().then((data) => {
            data.forEach((obj, i) => {
                const elem = {
                    id: data[i].id,
                    title: data[i].title,
                    descr: data[i].descr,
                    img: data[i].img,
                    date: data[i].date || undefined,
                    genres: obj.genres,
                    rating: data[i].rating,
                    clientRating: data[i].clientRating
                }
                return elem
            });
        })
    }

    onChangeRating = (id, value) => {
        const { data: arr } = this.state
        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = value

        let movieLSItems;

        try {
            movieLSItems = JSON.parse(localStorage.getItem('MovieAPI_DB'))
            localStorage.setItem('MovieAPI_DB', JSON.stringify([...movieLSItems, item]))
        } catch {
            localStorage.setItem('MovieAPI_DB', JSON.stringify([item]))
        }
        this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] })
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
