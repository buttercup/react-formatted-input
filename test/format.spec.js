import { format } from "../source/index.js";

test("outputs correct structure", function() {
    const output = format("ab", [
        { char: /\w/, repeat: 1 },
        { exactly: "-" },
        { char: /\w/, repeat: 1 }
    ]);
    expect(output).toHaveProperty("formatted", "a-b");
    expect(output).toHaveProperty("raw", "ab");
});

test("recognises 'exactly' matches in original value", function() {
    const output = format("a-b", [
        { char: /\w/, repeat: 1 },
        { exactly: "-" },
        { char: /\w/, repeat: 1 }
    ]);
    expect(output).toHaveProperty("formatted", "a-b");
    expect(output).toHaveProperty("raw", "ab");
});
