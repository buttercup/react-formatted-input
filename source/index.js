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
        // format the provided value immediately
        const { formatted, raw } = formatValue(props.value, props.format);
        this.state = {
            rawValue: raw,
            formattedValue: formatted
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.formattedValue !== this.state.formattedValue) {
            // only fire callback if the value changes
            this.props.onChange(this.state.formattedValue, this.state.rawValue);
        }
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
        const { formatted, raw } = formatValue(inputValue, this.props.format);
        this.setState({
            rawValue:  raw,
            formattedValue: formatted
        });
    }

    render() {
        return (
            <input
                type="text"
                {...this.getOptionalProps()}
                value={this.state.formattedValue}
                onChange={e => this.onValueChange(e)}
                />
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.formattedValue === nextState.formattedValue) {
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
    value: PropTypes.string
};

FormattedInput.defaultProps = {
    className: "",
    format: [],
    name: "",
    onChange: NOOP,
    placeholder: "",
    value: ""
};
