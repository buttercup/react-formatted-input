# react-formatted-input
An input component that abides by configurable formatting and constraint rules

[![Build Status](https://travis-ci.org/buttercup/react-formatted-input.svg?branch=master)](https://travis-ci.org/buttercup/react-formatted-input)

## About
`FormattedInput` takes a value and ensures that user input conforms to some specified rules. Formatted input instances can have their length limited, as well as having a _pattern_ enforced for their entry. As the user types, changes to the value are forced through the provided pattern and any sections that are invalid are simply stripped. What is returned from the component is a pattern-matched string.

This is useful for custom inputs that are designed to take values of a certain type, often mapping to real world information like credit card details or dates.

## Installation
To install, simply run `npm install @buttercup/react-formatted-input --save` or `yarn add @buttercup/react-formatted-input`.

## Usage
Import the `FormattedInput` class and just drop it in:

```jsx
import FormattedInput from "@buttercup/react-formatted-input";
import React, { Component } from "react";

export default class MyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idNumber: ""
        };
    }

    render() {
        const idPattern = [
            { match: /^\d{3}/ },
            { exactly: "-" },
            { match: /^\d{2}[a-z]{1}/i }
        ];
        return (
            <form>
                <FormattedInput
                    className="formatted-input"
                    format={idPattern}
                    value={this.state.idNumber}
                    onChange={value => { this.state.idNumber = value; }}
                    placeholder="ID in format: NNN-NNL"
                    />
            </form>
        );
    }

}
```
