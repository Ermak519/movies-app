import React from "react";
import { Pagination } from "antd";
import PropTypes from 'prop-types';

import './PaginationList.scss'

export default function PaginationList({ isError }) {
    return (
        <div className="pagination">
            {!isError ? <Pagination
                className="pagination__list"
                size="small"
                defaultCurrent={1}
                total={50} /> : null}
        </div>
    )
}

PaginationList.defaultProps = {
    isError: false,
};

PaginationList.propTypes = {
    isError: PropTypes.bool,
};