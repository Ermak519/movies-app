import React, { Component } from "react";
import { List, message } from 'antd';
import PropTypes from 'prop-types';

import MovieDBService from '../../services/MovieDBService';
import { MovieItem } from '../MovieItem';
import { PaginationList } from "../PaginationList";
import { LoadingStatus } from "../LoadingStatus";

import './MovieList.scss'


export default class MovieList extends Component {
    #localStore = 'MovieAPI_DB';

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

    getData = (query, initSate, page) => {
        if (!query) return
        this.setState({ status: initSate })

        this.movieDBService.getMovie(query, page)
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
                        clientRating: this.takeMovieRating(JSON.parse(localStorage.getItem('MovieAPI_DB')), results[i].id) || 0
                    }
                    return elem
                })
            })
            .then((elem) => { this.setState({ data: elem }) })
            .then(() => { this.setState({ status: 'loaded' }); })
            .catch(() => {
                message.error('404. Ой, что-то не так.');
                this.setState({ status: 'error' })
            });
    }

    takeMovieRating = (arr, id) => {
        try {
            const idx = arr.findIndex(elem => elem.id === id)
            const item = arr[idx]
            return item.clientRating
        } catch {
            return 0
        }

    }

    onChangeRating = (id, value) => {
        const { data: arr } = this.state
        const { onChangeDataLenght } = this.props;

        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = value
        this.saveMovieToLocalStorage(item, id, value)
        onChangeDataLenght();
        this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] })
    }

    saveMovieToLocalStorage = (item, id) => {
        if (localStorage.getItem(this.#localStore) === null) {
            localStorage.setItem(this.#localStore, JSON.stringify([item]));
        } else {
            const  movieLSItems = JSON.parse(localStorage.getItem(this.#localStore));

            const check = movieLSItems.find(obj => obj.id === id);
            // let idxInStorage;
            if(!check) {
                localStorage.setItem(this.#localStore, JSON.stringify([...movieLSItems, item]))
            } else {
                console.log('almost have')
                // idxInStorage = movieLSItems.findIndex(elem => elem.id === id);
                // const newItem = item;
                // newItem.clientRating = value;
                // localStorage.clear()
                // localStorage.setItem(this.#localStore, JSON.stringify([...movieLSItems.slice(0, idxInStorage), newItem, ...movieLSItems.slice(0, idxInStorage + 1)]));
            };
        }
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

MovieList.defaultProps = {
    request: '',
    currentPage: 1,
    onChangeCurrentPage: () => { },
    onChangeDataLenght: () => { }
};

MovieList.propTypes = {
    request: PropTypes.string,
    currentPage: PropTypes.number,
    onChangeCurrentPage: PropTypes.func,
    onChangeDataLenght: PropTypes.func
};
