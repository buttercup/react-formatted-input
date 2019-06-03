import React, { Component } from "react";
import PropTypes from "prop-types";

import { formatValue } from "./format.js";
import * as PatternPresets from "./presets.js";

const NOOP = () => {};

export const Presets = PatternPresets;

const PROPS_TO_EXCLUDE = ["element", "value", "onChange"];

export default class FormattedInput extends Component {
    static propTypes = {
        element: PropTypes.elementType.isRequired,
        format: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    };

    static defaultProps = {
        element: "input",
        format: [],
        onChange: NOOP,
        type: "text",
        value: ""
    };

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
        if (prevProps.value !== this.props.value) {
            const { formatted: formattedValue, raw: rawValue } = formatValue(
                this.props.value,
                this.getFormat(this.props)
            );
            this.setState({ formattedValue, rawValue });
        } else if (prevState.formattedValue !== this.state.formattedValue) {
            // only fire callback if the value changes
            this.props.onChange(this.state.formattedValue, this.state.rawValue);
        }
    }

    getFormat(props = this.props) {
        return this.inputType === "password" ? [] : props.format;
    }

    /**
     * Fetch optional pass-through props for the underlying input
     * @returns {Object} A props object to be spread onto the input
     */
    getOptionalProps() {
        return Object.keys(this.props).reduce((props, propName) => {
            if (PROPS_TO_EXCLUDE.indexOf(propName) === -1) {
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
        const { element: Element } = this.props;
        return (
            <Element
                type={this.inputType}
                {...this.getOptionalProps()}
                value={this.state.formattedValue}
                onChange={e => this.onValueChange(e)}
            />
        );
    }
}
