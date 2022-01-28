/* eslint-disable */

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
            storage:  !localStorage.getItem('MovieAPI_DB') ? 'empty' : 'data', // empty, data
            currentPage: 1, 
            search: 'ready', // done,edit
            rated: 'ready'
        };
    }

    onSearchMovie = text => this.setState({ request: text })
    
    changeStorageStatus = value => this.setState({storage: value})

    changeSearchStatus = value => this.setState({search: value})

    changeRatedStatus = value => this.setState({rated: value})

    onChangeCurrentPage = (page = 1) => this.setState({ currentPage: page })

    render() {
        const { request, currentPage, storage, search , rated} = this.state;
        const { TabPane } = Tabs;

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
                                
                                rated={rated}
                                search={search}
                                changeStorageStatus={this.changeStorageStatus}
                                changeRatedStatus={this.changeRatedStatus}
                                changeSearchStatus={this.changeSearchStatus}
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
                            {storage !== 'empty' ?
                                <MovieListRated
                                    storage={storage}
                                    rated={rated}
                                    search={search}
                                    changeStorageStatus={this.changeStorageStatus}
                                    changeRatedStatus={this.changeRatedStatus}
                                    changeSearchStatus={this.changeSearchStatus}
                                /> :
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={<span>Здесь пока ничего нет</span>} />
                            }
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
