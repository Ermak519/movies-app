import React, { Component } from "react";

import { MovieList } from "../MovieList";
import { SearchPanel } from "../SearchPanel";

import './App.scss';


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            request: '',
            currentPage: 1
        };
    }

    onSearchMovie = (text) => {
        console.log(text)
        this.setState({ request: text })
    }

    onChangeCurrentPage = (page = 1) => {
        this.setState({currentPage: page})
    }

    render() {
        const { request, currentPage } = this.state;

        return (
            <div className="app">
                <SearchPanel
                    request={request}
                    onSearchMovie={this.onSearchMovie} />
                <MovieList
                    request={request}
                    currentPage={currentPage}
                    onChangeCurrentPage={this.onChangeCurrentPage}
                />
            </div>
        )
    }
}
