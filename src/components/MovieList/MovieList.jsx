import React from "react";
import { List } from 'antd';

import { MovieItem } from '../MovieItem'

import './MovieList.scss'

export default function MovieList() {
    const data = [
        {
            title: 'Lorem ipsum 1',
            descr: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure maxime similique perspiciatis, voluptates odio labore dolore? Exercitationem, odit sed, porro nam reprehenderit doloremque non quo placeat, unde fugit a consequuntur.',
        },
        {
            title: 'Lorem ipsum 2',
            descr: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure maxime similique perspiciatis, voluptates odio labore dolore? Exercitationem, odit sed, porro nam reprehenderit doloremque non quo placeat, unde fugit a consequuntur.',
        },
        {
            title: 'Lorem ipsum 3',
            descr: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure maxime similique perspiciatis, voluptates odio labore dolore? Exercitationem, odit sed, porro nam reprehenderit doloremque non quo placeat, unde fugit a consequuntur.',
        },
        {
            title: 'Lorem ipsum 4',
            descr: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure maxime similique perspiciatis, voluptates odio labore dolore? Exercitationem, odit sed, porro nam reprehenderit doloremque non quo placeat, unde fugit a consequuntur.',
        },
        {
            title: 'Lorem ipsum 5',
            descr: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure maxime similique perspiciatis, voluptates odio labore dolore? Exercitationem, odit sed, porro nam reprehenderit doloremque non quo placeat, unde fugit a consequuntur.',
        },
        {
            title: 'Lorem ipsum 6',
            descr: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure maxime similique perspiciatis, voluptates odio labore dolore? Exercitationem, odit sed, porro nam reprehenderit doloremque non quo placeat, unde fugit a consequuntur.',
        },
    ];

    return (
        <div className="movie-list">
            <List
                grid={{
                    gutter: 16, column: 2
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <MovieItem item={item} />
                    </List.Item>
                )}
            />
        </div>
    )
}
