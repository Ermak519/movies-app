import React from "react";
import { Rate } from 'antd';

import './ClientRating.scss'

export default function ClientRating() {
    return <Rate
        allowHalf
        defaultValue={2.5}
        count={10}
        style={{
            fontSize: 14,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5
        }} />
}