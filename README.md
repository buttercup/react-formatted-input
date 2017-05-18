# react-formatted-input
An input component that abides by configurable formatting and constraint rules

[![Build Status](https://travis-ci.org/buttercup/react-formatted-input.svg?branch=master)](https://travis-ci.org/buttercup/react-formatted-input) [![npm package](https://img.shields.io/badge/%40buttercup%2Freact--formatted--input-npm-red.svg)](https://www.npmjs.com/package/@buttercup/react-formatted-input)

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
            { char: /\d/, repeat: 3 },
            { exactly: "-" },
            { char: /\d/, repeat: 2 },
            { char: /[a-z]/i }
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

### Presets
Some presets are available in the `source/presets.js` file that might be used like so:

```jsx
import FormattedInput, { Presets } from "@buttercup/react-formatted-input";
import React, { Component } from "react";

export default class MyForm extends Component {

    render() {
        return (
            <form>
                <FormattedInput
                    format={Presets.CreditCard}
                    value={this.state.creditCardNo}
                    />
                <FormattedInput
                    format={Presets.CreditCardDate}
                    value={this.state.creditCardValidFrom}
                    />
                <FormattedInput
                    format={Presets.CreditCardDate}
                    value={this.state.creditCardExpiry}
                    />
            </form>
        );
    }

}
```

## API
The `FormattedInput` component can be used without any props, of course, but you might want some of these for it to be useful:

### value _: String_
The initialisation value for the formatted input. This value is still run through the formatting process, so it is possible that the applied value is different to the one provided.

### format _: Array_
The format is a collection of patterns and delimiters that control what values can be entered. By default there is no format (so any input is allowed), but it can be set to an array of objects that are used to process the value upon every change:

 * **Character match** groups: A character match (`char`) is a regular expression designed to match just 1 character. It may also contain a `repeat` property to specify how many characters this pattern should match. `repeat` defaults to `1` if not specified. For example, `{ char: /\d/ }` will match exactly 1 number, whereas `{ char: /-/, repeat: 3 }` will match 3 dashes.
 * **Exact** groups: An exact group represents a string or character that must come next in the value. It can be used to specify mandatory delimiters in the value. For instance, `{ exactly: "." }` will enforce that a period appears next in the value. Exact groups also support the `repeat` property.

When used in combination together, complex values like credit-card numbers can be easily represented:

```javascript
[
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 }
]
```

Or even the expiry date of such a credit card:

```javascript
[
    { char: /[01]/ },  // month, 2 digits
    { char: /[0-9]/ }, // "
    { exactly: "/" },
    { char: /2/ },                  // year, 4 digits
    { char: /[0-9]/, repeat: 3 }    // "
]
```

### onChange _: Function_
A callback function for when the value changes. The only received parameter is the new value. The function is only called if the value differs from the last one.

### name, placeholder, className
Formatted input instances pass through these props to the underlying `<input>` element.
