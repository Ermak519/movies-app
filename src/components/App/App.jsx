import React, { Component } from "react";
// import debounce from "lodash.debounce";

import { MovieList } from "../MovieList";
import { SearchPanel } from "../SearchPanel";

import './App.scss';


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            request: ''
        };

        // this.movieDBService = new MovieDBService();
        // this.movieDBService.getData('batman').then((res)=>{console.log(res)})
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
        this.setState({request: text})
    }

    render() {
        const { request } = this.state;

        return (
            <div className="app">
                <SearchPanel
                    onSearchMovie={this.onSearchMovie} />
                <MovieList
                    request={request}
                    onChangeRating={this.onChangeRating}
                /> 
            </div>
        )
    }
}
