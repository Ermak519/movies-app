import React, { Component } from "react";
import { message } from 'antd'
import { MovieList } from "../MovieList";


import MovieDBService from '../../services/MovieDBService';
import './App.scss';


export default class App extends Component {
    constructor() {
        super();

        this.movieDBService = new MovieDBService();

        this.state = {
            data: [
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null,
                    rating: null
                }
            ],
            isLoad: true,
            isError: false,
        };

        this.request = 'batman'

        this.movieDBService.getData(this.request).then((res) => { console.log(res) })

        this.movieDBService.getMovie(this.request)
            .then((res) => {
                const { results } = res;
                const { data } = this.state;
                return data.map((obj, i) => {
                    const elem =
                    {
                        title: results[i].title,
                        descr: results[i].overview,
                        img: results[i].poster_path,
                        date: results[i].release_date || undefined,
                        genres: obj.genres,
                        rating: results[i].popularity.toFixed(1)
                    }
                    return elem
                })
            })
            .then((elem) => { this.setState({ data: elem, isLoad: false }) })
            .catch(() => {
                message.error('404. Ой, что-то не так.');
                this.setState({ isLoad: false, isError: true })
            });
    }

    render() {
        const { data, isLoad, isError } = this.state;

        return (
            <div className="app">
                <MovieList
                    data={data}
                    isLoad={isLoad}
                    isError={isError}
                />
            </div>
        )
    }
}
