import React from "react";
import { convertToObject } from "react-json-renderer";
import { shallow } from "enzyme";

import { FormattedText, Presets } from "../source/index.js";

test("accepts a value upon initialisation", function() {
    console.log("!", FormattedText);
    const input = convertToObject(
        <FormattedText value="test value" />
    );
    const inputEl = input.props.children;
    expect(inputEl.props.value).toEqual("test value");
});
