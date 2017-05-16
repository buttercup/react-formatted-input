import React from "react";
import { convertToObject } from "react-json-renderer";
import { shallow } from "enzyme";
import { spy } from "sinon";

import FormattedInput from "../source/index.jsx";

test("accepts a value upon initialisation", function() {
    const input = convertToObject(
        <FormattedInput
            value="test value"
            />
    );
    const inputEl = input.props.children;
    expect(inputEl.props.value).toEqual("test value");
});

test("prevents values being longer than maxLength", function() {
    const input = convertToObject(
        <FormattedInput
            maxLength={5}
            value="too long"
            />
    )
    const inputEl = input.props.children;
    expect(inputEl.props.value).toEqual("too l");
});

test("it forces values to adhere to a pattern", function() {
    const pattern = [
        { match: /^[0-9]{2}/ },
        { exactly: "/" },
        { match: /^[12][0-9]{3}/ }
    ];
    const input = convertToObject(
        <FormattedInput
            format={pattern}
            value="bad19/2005extra"
            />
    );
    const inputEl = input.props.children;
    expect(inputEl.props.value).toEqual("19/2005");
});

test("automatically enters delimiters", function() {
    const pattern = [
        { match: /^[0-9]{4}/ },
        { exactly: "-" },
        { match: /^[0-9]{4}/ },
        { exactly: "-" },
        { match: /^[0-9]{4}/ },
        { exactly: "-" },
        { match: /^[0-9]{4}/ }
    ];
    const input = convertToObject(
        <FormattedInput
            format={pattern}
            value="3204651290010002"
            />
    );
    const inputEl = input.props.children;
    expect(inputEl.props.value).toEqual("3204-6512-9001-0002");
});

test("fires callback when value changes", function() {
    const pattern = [
        { match: /^[0-9]{1}/ },
        { exactly: ":" },
        { match: /^[a-z]{1}/i }
    ];
    return new Promise(function(resolve) {
        const callback = function(value) {
            expect(value).toEqual("3:a");
            resolve();
        };
        const wrapper = shallow(
            <FormattedInput
                format={pattern}
                onValueChange={callback}
                />
        );
        wrapper.simulate("change", { target: { value: "3a" } });
    });
});
