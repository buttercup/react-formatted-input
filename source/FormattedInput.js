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
        const { formatted, raw } = formatValue(props.value, this.getFormat(props));
        this.state = {
            rawValue: raw,
            formattedValue: formatted
        };
    }

    get inputType() {
        if (this.props.type === "password") {
            return "password";
        }
        return "text";
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.formattedValue !== this.state.formattedValue) {
            // only fire callback if the value changes
            this.props.onChange(this.state.formattedValue, this.state.rawValue);
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
        const { formatted, raw } = formatValue(inputValue, this.getFormat());
        this.setState({
            rawValue: raw,
            formattedValue: formatted
        });
    }

    render() {
        return (
            <input
                type={this.inputType}
                {...this.getOptionalProps()}
                value={this.state.formattedValue}
                onChange={e => this.onValueChange(e)}
                />
        );
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
