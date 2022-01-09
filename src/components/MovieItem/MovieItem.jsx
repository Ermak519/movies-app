import React from "react";
import { Card } from 'antd';

import './MovieItem.scss'

const { Meta } = Card;

export default function MovieItem(item) {
    const [values] = Object.values(item)
    const { title, descr } = values
    return (
        <div className="movie-list-item">
            <Card hoverable
                style={{ width: 340, display: "flex" }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                <Meta title={title} description={descr} />

            </Card>
        </div>
    )
}
