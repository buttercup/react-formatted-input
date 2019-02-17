import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatValue } from "./format.js";

export default class FormattedText extends Component {
    static propTypes = {
        format: PropTypes.arrayOf(PropTypes.object).isRequired,
        value: PropTypes.string.isRequired
    };

    static defaultProps = {
        format: []
    };

    render() {
        return <>{formatValue(this.props.value, this.props.format).formatted}</>;
    }
}
