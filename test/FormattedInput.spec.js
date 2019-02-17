import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import { FormattedInput, Presets } from "../source/index.js";

test("accepts a value upon initialisation", function() {
    const input = TestRenderer.create(<FormattedInput value="test value" />).toTree();
    expect(input.rendered.props.value).toEqual("test value");
});

test("supports optional <input> props", function() {
    const input = TestRenderer.create(
        <FormattedInput name="myInput" placeholder="Your text here" className="class1 class2" />
    ).toTree();
    expect(input.rendered.props.name).toEqual("myInput");
    expect(input.rendered.props.placeholder).toEqual("Your text here");
    expect(input.rendered.props.className).toEqual("class1 class2");
});

test("supports password type, which disables format", function() {
    const input = TestRenderer.create(
        <FormattedInput value="abc" format={[{ char: /a/ }]} type="password" />
    ).toTree();
    expect(input.rendered.props.value).toEqual("abc");
    expect(input.rendered.props.type).toEqual("password");
});

test("it forces values to adhere to a pattern", function() {
    // prettier-ignore
    const pattern = [
        { char: /[0-9]/, repeat: 2 },
        { exactly: "/" },
        { char: /[12]/ },
        { char: /[0-9]/, repeat: 3 }
    ];
    const input = TestRenderer.create(
        <FormattedInput format={pattern} value="bad19/2005extra" />
    ).toTree();
    expect(input.rendered.props.value).toEqual("19/2005");
});

test("enforces maximum length through the use of a pattern", function() {
    const pattern = [{ char: /./, repeat: 6 }];
    const input = TestRenderer.create(
        <FormattedInput format={pattern} value="123456789" />
    ).toTree();
    expect(input.rendered.props.value).toEqual("123456");
});

test("allows partial values", function() {
    // prettier-ignore
    const pattern = [
        { char: /[a-z]/i, repeat: 5 }
    ];
    const input = TestRenderer.create(<FormattedInput format={pattern} value="a1bc" />).toTree();
    expect(input.rendered.props.value).toEqual("abc");
});

test("supports repeating 'exactly' groups", function() {
    const pattern = [{ char: /[a-z]/i }, { exactly: "*", repeat: 3 }, { char: /[a-z]/i }];
    const input = TestRenderer.create(<FormattedInput format={pattern} value="aaaa" />).toTree();
    expect(input.rendered.props.value).toEqual("a***a");
});

test("automatically enters delimiters", function() {
    // prettier-ignore
    const pattern = [
        { char: /[0-9]/, repeat: 4 },
        { exactly: "-" },
        { char: /[0-9]/, repeat: 4 },
        { exactly: "-" },
        { char: /[0-9]/, repeat: 4 },
        { exactly: "-" },
        { char: /[0-9]/, repeat: 4 }
    ];
    const input = TestRenderer.create(
        <FormattedInput format={pattern} value="3204651290010002" />
    ).toTree();
    expect(input.rendered.props.value).toEqual("3204-6512-9001-0002");
});

test("fires callback when value changes", function() {
    // prettier-ignore
    const pattern = [
        { char: /[0-9]/ },
        { exactly: ":" },
        { char: /[a-zA-Z]/ }
    ];
    return new Promise(function(resolve) {
        const callback = function(formatted, raw) {
            expect(formatted).toEqual("3:a");
            expect(raw).toEqual("3a");
            resolve();
        };
        const wrapper = shallow(<FormattedInput format={pattern} onChange={callback} />);
        wrapper.simulate("change", { target: { value: "3a" } });
    });
});

test("leaves the value empty if provided as such", function() {
    // prettier-ignore
    const pattern = [
        { char: /[0-9]/ },
        { exactly: ":" },
        { char: /[a-zA-Z]/ }
    ];
    const input = TestRenderer.create(<FormattedInput format={pattern} value="" />).toTree();
    expect(input.rendered.props.value).toEqual("");
});

test("updates to empty correctly", function() {
    // prettier-ignore
    const pattern = [
        { char: /[0-9]/ },
        { exactly: ":" },
        { char: /[a-zA-Z]/ }
    ];
    return new Promise(function(resolve) {
        const callback = function(value) {
            expect(value).toEqual("");
            resolve();
        };
        const wrapper = shallow(<FormattedInput format={pattern} value="3a" onChange={callback} />);
        wrapper.simulate("change", { target: { value: "" } });
    });
});

test("leaves out the last delimiter if the string is short", function() {
    // prettier-ignore
    const pattern = [
        { char: /[0-9]/ },
        { exactly: ":" },
        { char: /[a-z]/i },
        { exactly: ":" },
        { char: /[a-z]/i }
    ];
    const input = TestRenderer.create(<FormattedInput format={pattern} value="5c" />).toTree();
    expect(input.rendered.props.value).toEqual("5:c");
});

test("supports presets", function() {
    const input = TestRenderer.create(
        <FormattedInput format={Presets.CreditCard} value="3204651290010002" />
    ).toTree();
    expect(input.rendered.props.value).toEqual("3204-6512-9001-0002");
});

test("supports custom components", function() {
    const Comp = () => <span />;
    const testRenderer = TestRenderer.create(<FormattedInput element={Comp} value="test" />);
    const testInstance = testRenderer.root;
    expect(testRenderer.toTree().rendered.props.value).toEqual("test");
    expect(testInstance.findByType("span")).toBeDefined();
    expect(() => testInstance.findByType("input")).toThrow();
});

test("updates props correctly", function() {
    const input = TestRenderer.create(<FormattedInput value="test" />);
    expect(input.toTree().rendered.props.value).toEqual("test");
    input.update(<FormattedInput value="" />);
    expect(input.toTree().rendered.props.value).toEqual("");
});
