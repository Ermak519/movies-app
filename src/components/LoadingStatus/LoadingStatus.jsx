import React from "react";
import PropTypes from 'prop-types';

import { Result, Spin } from "antd";

import './LoadingStatus.scss'

export default function LoadingStatus({ status: statusType }) {
    let status
    let title
    let subTitle

    if (statusType === 'empty') {
        status = 'success';
        title = 'Введите запрос в строку поиска';
        subTitle = 'Какой фильм хотите найти?'
    }

    if (statusType === 'error') {
        status = '404';
        title = '404';
        subTitle = 'По Вашему запросу ничего не найдено'
    }

    return (
        statusType === 'loading' ?
            <div className="load-spin">
                <Spin
                    size="large"
                />
            </div> : <Result
                status={status}
                title={title}
                subTitle={subTitle}
            />
    )

}


LoadingStatus.defaultProps = {
    status: ''
}

LoadingStatus.propTypes = {
    status: PropTypes.string,
}