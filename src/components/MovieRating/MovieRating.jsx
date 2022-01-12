import React from "react";
import { Rate } from 'antd';

import './MovieRating.scss'

export default function MovieRating () {
    return <Rate 
            allowHalf 
            defaultValue={2.5}
            disabled
            count={10}
            style={{
                fontSize: 14, 
                paddingTop: 10, 
                paddingBottom: 10,
                paddingLeft: 5,
                paddingRight: 5
            }}/>
}