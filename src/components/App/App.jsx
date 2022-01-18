import React, { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import { Result } from 'antd';

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
        this.setState({ currentPage: page })
    }

    render() {
        const { request, currentPage } = this.state;

        return (
            <div className="app">
                <Online>
                    <SearchPanel
                        request={request}
                        onSearchMovie={this.onSearchMovie} />
                    <MovieList
                        request={request}
                        currentPage={currentPage}
                        onChangeCurrentPage={this.onChangeCurrentPage}
                    />
                </Online>
                <Offline>
                    <Result
                        status="500"
                        title="Отсутвует подключение к интернету"
                        subTitle="Найдите ближайшую точку Wi-Fi" />
                </Offline>
            </div>
        )
    }
}
