import React, { Component } from "react";
import { MovieList } from "../MovieList";

import MovieDBService from '../../services/MovieDBService';
import './App.scss';


export default class App extends Component {
    constructor(){
        super();

        this.movieDBService = new MovieDBService();

        this.state = {
            data: [
                {
                    title: null,
                    descr: null,
                    img: null
                },
                {
                    title: null,
                    descr: null,
                    img: null
                },
                {
                    title: null,
                    descr: null,
                    img: null
                },
                {
                    title: null,
                    descr: null,
                    img: null
                },
                {
                    title: null,
                    descr: null,
                    img: null
                },
                {
                    title: null,
                    descr: null,
                    img: null
                }
            ],
        };
        this.movieDBService.getMovie('spider')
            .then((res) => {
                const {results} = res;
                const {data} = this.state;
                return data.map((obj, i) => {
                    const elem = obj
                    elem.title = results[i].title;
                    elem.descr = results[i].overview;
                    elem.img = results[i].poster_path;
                    return elem;
                })
            })
            .then((newArr)=>{this.setState({data: newArr})});
    }

    render(){
        const {data} = this.state;
        
        return (
            <div className="app">
                <MovieList 
                    data={data}
                />
            </div>
        )
    }
}
