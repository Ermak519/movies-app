import React, { Component } from "react";
import { Input } from 'antd';
import PropTypes from "prop-types";

import debounce from "lodash.debounce";


import './SearchPanel.scss';

export default class SearchPanel extends Component {
    constructor({ onSearchMovie }) {
        super()
        this.onSearchMovie = onSearchMovie

        this.state = {
            value: ''
        }

        this.search = debounce(this.onSearchMovie, 250)
    }

    onSearch = (e) => {
        const { value } = this.state;
        this.onUpdateInputValue(e).then(() => { if (value.trim() !== '') this.search(value); });
    }

    onUpdateInputValue = async (event) => this.setState({ value: event.target.value })

    render() {
        const { value } = this.state
        return (
            <div className="search-panel">
                <Input
                    className="search-panel__input"
                    placeholder="Type to search..."
                    value={value}
                    onChange={this.onSearch}
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