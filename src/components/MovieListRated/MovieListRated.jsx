import React, { Component } from "react";
import { List } from 'antd';
import PropTypes from 'prop-types';

import MovieDBService from '../../services/MovieDBService';
import { MovieItem } from '../MovieItem';
import { PaginationList } from "../PaginationList";
import { LoadingStatus } from "../LoadingStatus";

import './MovieListRated.scss'


export default class MovieListRated extends Component {
    constructor(props) {
        super(props);
        this.movieDBService = new MovieDBService();

        this.state = {
            status: '', // empty, error, loading, loading-cards, loaded
            totalPages: null,
            data: [
                {
                    id: null,
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null,
                    clientRating: null
                },
                {
                    id: null,
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null,
                    clientRating: null
                },
                {
                    id: null,
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null,
                    clientRating: null
                },
                {
                    id: null,
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null,
                    clientRating: null
                },
                {
                    id: null,
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null,
                    clientRating: null
                },
                {
                    id: null,
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null,
                    clientRating: null
                }
            ],
        }
    }

    componentDidMount() {
        const { request } = this.props;
        if (!request) {
            this.setState({ status: 'empty' })
        } else {
            this.getData(request)
        }
    }

    componentDidUpdate(prevProps) {
        const { request, currentPage, onChangeCurrentPage } = this.props;
        if (request !== prevProps.request && !request) this.getData('a', 'loading')

        if (request !== prevProps.request) {
            this.getData(request, 'loading')
            onChangeCurrentPage()
        }

        if (currentPage !== prevProps.currentPage && request === prevProps.request) {
            this.getData(request, 'loading-cards', currentPage)
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
        const { status, data, totalPages } = this.state;
        const { currentPage, onChangeCurrentPage } = this.props;

        return (
            <div className="movie-list">
                {(status === 'loaded' || status === 'loading-cards') ?
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
                    /> : <LoadingStatus
                        status={status}
                    />
                }
                <PaginationList
                    totalPages={totalPages}
                    currentPage={currentPage}
                    status={status}
                    onChangeCurrentPage={onChangeCurrentPage} />
            </div>
        )
    }
}

MovieListRated.defaultProps = {
    request: '',
    currentPage: 1,
    onChangeCurrentPage: () => { }
};

MovieListRated.propTypes = {
    request: PropTypes.string,
    currentPage: PropTypes.number,
    onChangeCurrentPage: PropTypes.func
};
