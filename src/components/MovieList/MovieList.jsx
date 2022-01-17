import React, { Component } from "react";
import { List, message } from 'antd';
import PropTypes from 'prop-types';

import MovieDBService from '../../services/MovieDBService';
import { MovieItem } from '../MovieItem';
import { PaginationList } from "../PaginationList";
import { LoadingStatus } from "../LoadingStatus";

import './MovieList.scss'


export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.movieDBService = new MovieDBService();

        this.state = {
            status: '', // empty, error, loading, loaded
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
        const { request } = this.props;

        if (request !== prevProps.request) {
            this.getData(request)
        }

    }

    getData = (query) => {
        if (!query) return

        this.movieDBService.getMovie(query)
            .then((res) => {
                this.setState({ status: 'loading' })
                return res
            })
            .then((res) => {
                const { results, total_pages: totalPages } = res;
                this.setState({ totalPages });
                const { data } = this.state;
                return data.map((obj, i) => {
                    const elem =
                    {
                        id: results[i].id,
                        title: results[i].title,
                        descr: results[i].overview,
                        img: results[i].poster_path,
                        date: results[i].release_date || undefined,
                        genres: obj.genres,
                        rating: results[i].vote_average,
                        clientRating: parseFloat(localStorage.getItem(`movie-rating_${results[i].id}`)) || 0
                    }
                    return elem
                })
            })
            .then((elem) => { this.setState({ data: elem, status: 'loaded' }) })
            .catch(() => {
                message.error('404. Ой, что-то не так.');
                this.setState({ status: 'error' })
            });
    }

    onChangeRating = (id, value) => {
        const { data: arr } = this.state
        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = localStorage.setItem(`movie-rating_${id}`, value)
        this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] })
    }

    render() {
        const { status, data, totalPages } = this.state;

        return (
            <div className="movie-list">
                {
                    status === ('loaded' || 'loading') ?
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
                    status={status} />
            </div>
        )
    }
}

MovieList.defaultProps = {
    request: '',
};

MovieList.propTypes = {
    request: PropTypes.string,
};
