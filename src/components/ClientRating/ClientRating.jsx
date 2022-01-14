import React, { Component } from "react";
import { Rate } from 'antd';
import PropTypes from "prop-types";

import './ClientRating.scss'

export default class ClientRating extends Component {
    constructor({id, clientRating, onChangeRating}){
        super()
        this.id = id
        this.onChangeRating = onChangeRating

        this.state ={
            rating: clientRating
        }
    }


    onChange = (value) => {
        this.onChangeRating(this.id, value)
        this.setState({
            rating: value
        })
    }

        render(){
            const {rating} = this.state
            return <Rate
                    allowHalf
                    defaultValue={0}
                    count={10}
                    style={{
                        fontSize: 14,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 5,
                        paddingRight: 5
                    }} 
                    value={rating}
                    onChange={(value)=>{this.onChange(value)}}/>
        }


}

ClientRating.defaultProps = {
    onChangeRating: ()=>{},
    clientRating: 0,
    id: 0
};

ClientRating.propTypes = {
    onChangeRating: PropTypes.func,
    clientRating: PropTypes.number,
    id: PropTypes.number
};