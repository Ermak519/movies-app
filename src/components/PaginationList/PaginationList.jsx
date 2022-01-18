import React from "react";
import { Pagination } from "antd";
import PropTypes from 'prop-types';

import './PaginationList.scss'

export default function PaginationList({ totalPages, status, currentPage, onChangeCurrentPage }) {
    return (
        <div className="pagination">
            {
                status === 'loaded' ? <Pagination
                    className="pagination__list"
                    size="small"
                    defaultCurrent={1}
                    showSizeChanger={false}
                    current={currentPage}
                    onChange={onChangeCurrentPage}
                    total={totalPages * 10} /> : null
            }
        </div>
    )
}

PaginationList.defaultProps = {
    status: '',
    onChangeCurrentPage: ()=>{},
    currentPage: 1,
    totalPages: 10
};

PaginationList.propTypes = {
    status: PropTypes.string,
    onChangeCurrentPage: PropTypes.func,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number
};