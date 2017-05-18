import React, { Component } from "react";
import PropTypes from "prop-types";

import { formatValue } from "./format.js";
import * as PatternPresets from "./presets.js";

const NOOP = () => {};

export const Presets = PatternPresets;

/**
 * Formatted Input component
 * @augments Component
 */
export default class FormattedInput extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            // format the provided value immediately
            value: formatValue(props.value, this.getFormat(props))
        };
    }

    get inputType() {
        if (this.props.type === "password") {
            return "password";
        }
        return "text";
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            // only fire callback if the value changes
            this.props.onChange(this.state.value)
        }
    }

    getFormat(props = this.props) {
        return (this.inputType === "password") ?
            [] :
            props.format;
    }

    /**
     * Fetch optional pass-through props for the underlying input
     * @returns {Object} A props object to be spread onto the input
     */
    getOptionalProps() {
        return ["name", "placeholder", "className"].reduce((props, propName) => {
            if (this.props[propName].length > 0) {
                return {
                    ...props,
                    [propName]: this.props[propName]
                };
            }
            return props;
        }, {});
    }

    /**
     * Handle value changes
     * @param {Object} event An input change event
     */
    onValueChange(event) {
        const inputValue = event.target.value;
        this.setState({
            value: formatValue(inputValue, this.getFormat())
        });
    }

    render() {
        return (
            <input
                type={this.inputType}
                {...this.getOptionalProps()}
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
    className: PropTypes.string,
    format: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
};

FormattedInput.defaultProps = {
    className: "",
    format: [],
    name: "",
    onChange: NOOP,
    placeholder: "",
    type: "text",
    value: ""
};
