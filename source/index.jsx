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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            // only fire callback if the value changes
            this.props.onChange(this.state.value)
        }
    }

    onValueChange(event) {
        const inputValue = event.target.value;
        this.setState({
            value: this.processValue(inputValue)
        });
    }

    processValue(value, props = this.props) {
        const newValue = filterValue(value, {
            maxLength: this.props.maxLength
        });
        return formatValue(newValue, props.format);
    }

    render() {
        const optionalProps = {};
        if (this.props.name.length > 0) {
            optionalProps.name = this.props.name;
        }
        if (this.props.placeholder.length > 0) {
            optionalProps.placeholder = this.props.placeholder;
        }
        return (
            <input
                type="text"
                {...optionalProps}
                value={this.state.value}
                onChange={e => this.onValueChange(e)}
                />
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.value === nextState.value) {
            // no value change, cancel
            return false;
        }
        return true;
    }

}

FormattedInput.propTypes = {
    format: PropTypes.arrayOf(PropTypes.object),
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

FormattedInput.defaultProps = {
    format: [],
    maxLength: Infinity,
    name: "",
    onChange: NOOP,
    placeholder: "",
    value: ""
};
