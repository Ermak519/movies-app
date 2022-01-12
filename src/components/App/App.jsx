import React, { Component } from "react";
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
                    date: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null
                },
                {
                    title: null,
                    descr: null,
                    img: null,
                    genres: ['Action', 'Drama'],
                    date: null
                }
            ],
            isLoad: true
        };

        this.movieDBService.getMovie('batman')
            .then((res) => {
                const { results } = res;
                const { data } = this.state;
                return data.map((obj, i) => {
                    const elem = obj
                    elem.title = results[i].title;
                    elem.descr = results[i].overview;
                    elem.img = results[i].poster_path;
                    elem.date = results[i].release_date;
                    return elem;
                })
            })
            .then((elem) => { this.setState({ data: elem }) });
    }

    render() {
        const { data, isLoad } = this.state;

        return (
            <div className="app">
                <MovieList
                    data={data}
                    isLoad={isLoad}
                />
            </div>
        )
    }
}
