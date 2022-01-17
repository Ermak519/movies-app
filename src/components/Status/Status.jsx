import React from "react";
import PropTypes from 'prop-types';

import { Result } from "antd";

export default function Status ({status: typeError}) {
    let status 
    let title
    let subTitle

    if(typeError === 'empty') {
        status = 'success';
        title = 'Введите запрос в строку поиска';
        subTitle = 'Какой фильм хотите найти?'
    }

    if(typeError === 'error') {
        status = '404';
        title = '404';
        subTitle = 'Вы ввели неправильно запрос'
    }

    if(typeError === 'network error') {
        status = 'error';
        title = 'Нет сети';
        subTitle = 'Отсутствует подключение к сети Интернет'
    }

    return (
        <Result
            className="movie-list-error"
            status={status}
            title={title}
            subTitle={subTitle}
        /> 
    )

}


Status.defaultProps = {
    status: ''
}

Status.propTypes = {
    status: PropTypes.string,
}