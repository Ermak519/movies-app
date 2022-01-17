import React, { Component } from "react";

import { MovieList } from "../MovieList";
import { SearchPanel } from "../SearchPanel";

import './App.scss';


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            request: ''
        };
    }



    onSearchMovie = (text) => {
        console.log(text)
        this.setState({ request: text })
    }

    render() {
        const { request } = this.state;

        return (
            <div className="app">
                <SearchPanel
                    request={request}
                    onSearchMovie={this.onSearchMovie} />
                <MovieList
                    request={request}
                />
            </div>
        )
    }
}
