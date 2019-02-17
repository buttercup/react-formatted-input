import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import { FormattedText, Presets } from "../source/index.js";

test("accepts a value upon initialisation", function() {
    const testRenderer = TestRenderer.create(<FormattedText value="test value" />);
    const el = testRenderer.toTree();
    expect(el.props.value).toBe("test value");
});

test("formats values", function() {
    const testRenderer = TestRenderer.create(
        <FormattedText
            value="ab"
            format={[{ char: /\w/, repeat: 1 }, { exactly: "-" }, { char: /\w/, repeat: 1 }]}
        />
    );
    const el = testRenderer.toTree();
    expect(el.rendered).toBe("a-b");
});
