import React, { Component } from "react";
import PropTypes from "prop-types";

import { filterValue, formatValue } from "./filter.js";

const NOOP = () => {};

export default class FormattedInput extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            value: this.processValue(props.value, props)
        };
    }

    onValueChange(event) {
        const inputValue = event.target.value;
        this.setState(
            { value: this.processValue(inputValue) },
            () => this.props.onValueChange(this.state.value)
        );
    }

    processValue(value, props = this.props) {
        const newValue = filterValue(value, {
            maxLength: this.props.maxLength
        });
        return formatValue(newValue, props.format);
    }

    render() {
        return (
            <input
                value={this.state.value}
                onChange={e => this.onValueChange(e)}
                placeholder={this.props.placeholder}
                />
        );
    }

}

FormattedInput.propTypes = {
    format: PropTypes.arrayOf(PropTypes.object),
    maxLength: PropTypes.number,
    onValueChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

FormattedInput.defaultProps = {
    format: [],
    maxLength: Infinity,
    onValueChange: NOOP,
    placeholder: "",
    value: ""
};
