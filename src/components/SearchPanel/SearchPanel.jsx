import React, { Component } from "react";
import { Input } from 'antd';
import PropTypes from "prop-types";

import './SearchPanel.scss';

export default class SearchPanel extends Component {
    constructor({ request }) {
        super()

        this.state = {
            value: request
        }
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
                    onChange={this.onChange} />
            </div>
        )
    }
}

SearchPanel.defaultProps = {
    request: '',
};

SearchPanel.propTypes = {
    request: PropTypes.string,
};