import React, { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import { Result, Tabs, Empty } from 'antd';
import { SearchOutlined, StarOutlined } from '@ant-design/icons';

import { MovieList } from "../MovieList";
import { MovieListRated } from "../MovieListRated";
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
        const { TabPane } = Tabs;
        console.log(localStorage.key(3))
        return (
            <div className="app">
                <Online>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane
                            tab={
                                <span>
                                    <SearchOutlined />
                                    Search
                                </span>
                            }
                            key="1">
                            <SearchPanel
                                request={request}
                                onSearchMovie={this.onSearchMovie} />
                            <MovieList
                                request={request}
                                currentPage={currentPage}
                                onChangeCurrentPage={this.onChangeCurrentPage}
                            />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <StarOutlined />
                                    Rated
                                </span>
                            }
                            key="2">
                            <SearchPanel
                                request={request}
                                onSearchMovie={this.onSearchMovie} />
                            {localStorage.length !== 0 ?
                                <MovieListRated
                                    localStorageLength={localStorage.length}
                                /> :
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={<span>Здесь пока ничего нет</span>} />}
                        </TabPane>
                    </Tabs>
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
