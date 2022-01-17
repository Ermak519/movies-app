import React from "react";
import { Pagination } from "antd";
import PropTypes from 'prop-types';

import './PaginationList.scss'

export default function PaginationList({ status }) {
    return (
        <div className="pagination">
            {
                status === 'loaded' ? <Pagination
                    className="pagination__list"
                    size="small"
                    defaultCurrent={1}
                    total={50} /> : null
            }
        </div>
    )
}

PaginationList.defaultProps = {
    status: '',
};

PaginationList.propTypes = {
    status: PropTypes.string,
};