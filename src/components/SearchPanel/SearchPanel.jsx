import React, { Component } from "react";
import { Input } from 'antd';
import PropTypes from "prop-types";

import './SearchPanel.scss';

export default class SearchPanel extends Component {
    constructor({ onSearchMovie }) {
        super()
        this.onSearchMovie = onSearchMovie

        this.state = {
            value: ''
        }
    }

    onSearch = () => {
        const { value } = this.state;
        this.onSearchMovie(value)
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }


    render() {
        const { value } = this.state
        return (
            <div className="search-panel">
                <Input
                    className="search-panel__input"
                    placeholder="Type to search..."
                    value={value}
                    onChange={this.onChange}
                    onPressEnter={this.onSearch}
                />
            </div>
        )
    }
}

SearchPanel.defaultProps = {
    onSearchMovie: () => { },
};

SearchPanel.propTypes = {
    onSearchMovie: PropTypes.func,
};