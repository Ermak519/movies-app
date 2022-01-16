import React, { Component } from "react";
import { message, Spin } from 'antd'
import { MovieList } from "../MovieList";
import { SearchPanel } from "../SearchPanel";
import { PaginationList } from "../PaginationList";


// import debounce from "lodash.debounce";


import MovieDBService from '../../services/MovieDBService';
import './App.scss';


export default class App extends Component {
    constructor() {
        super();

        this.movieDBService = new MovieDBService();

        this.state = {
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
            loading: false,
            isLoad: true,
            isError: false,
            request: 'batman'
        };
        // this.movieDBService.getData(this.request).then((res) => { console.log(res) })

        this.movieDBService.getMovie('batman')
            .then((res) => {
                this.setState({ loading: true });
                return res
            })
            .then((res) => {
                const { results } = res;
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
            .then((elem) => { this.setState({ data: elem, isLoad: false, loading: false }) })
            .catch(() => {
                message.error('404. Ой, что-то не так.');
                this.setState({ isLoad: false, isError: true, loading: false })
            });
    }

    onChangeRating = (id, value) => {
        const { data: arr } = this.state
        const idx = arr.findIndex(elem => elem.id === id)
        const item = arr[idx]
        item.clientRating = localStorage.setItem(`movie-rating_${id}`, value)
        this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] })
    }

    onSearchMovie = (text) => {
        console.log(text)
    }

    render() {
        const { data, isLoad, isError, request, loading } = this.state;

        return (
            <div className="app">
                <SearchPanel
                    request={request}
                    onSearchMovie={this.onSearchMovie} />
                {!loading ?
                    <MovieList
                        data={data}
                        isLoad={isLoad}
                        isError={isError}
                        onChangeRating={this.onChangeRating}
                    /> :
                    <Spin
                        size="large" />
                }
                <PaginationList
                    isError={isError} />
            </div>
        )
    }
}
