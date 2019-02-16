import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { formatValue } from "./format.js";

export default class FormattedText extends Component {
    render() {
        return (
            <span>
                {formatValue(this.props.value, this.props.format)}
            </span>
        );
    }
}

FormattedText.propTypes = {
    format: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.string.isRequired
};

FormattedText.defaultProps = {
    format: []
};
