# react-formatted-input
An input component that abides by configurable formatting and constraint rules

[![Build Status](https://travis-ci.org/buttercup/react-formatted-input.svg?branch=master)](https://travis-ci.org/buttercup/react-formatted-input)

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
            <FormattedInput
                className="formatted-input"
                format={idPattern}
                value={this.state.idNumber}
                onChange={value => { this.state.idNumber = value; }}
                placeholder="ID in format: NNN-NNL"
                />
        );
    }

}
```
