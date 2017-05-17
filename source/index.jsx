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
        return (
            <input
                type="text"
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
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

FormattedInput.defaultProps = {
    className: "",
    format: [],
    maxLength: Infinity,
    name: "",
    onChange: NOOP,
    placeholder: "",
    value: ""
};
