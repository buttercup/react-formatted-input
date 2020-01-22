import { format } from "../source/index.js";

describe("format", function() {
    it("outputs correct structure", function() {
        const output = format("ab", [
            { char: /\w/, repeat: 1 },
            { exactly: "-" },
            { char: /\w/, repeat: 1 }
        ]);
        expect(output).toHaveProperty("formatted", "a-b");
        expect(output).toHaveProperty("raw", "ab");
    });

    it("recognises 'exactly' matches in original value", function() {
        const output = format("a-b", [
            { char: /\w/, repeat: 1 },
            { exactly: "-" },
            { char: /\w/, repeat: 1 }
        ]);
        expect(output).toHaveProperty("formatted", "a-b");
        expect(output).toHaveProperty("raw", "ab");
    });

    it("outputs correct structure (string)", function() {
        const output = format("ab", [
            { char: "\\w", repeat: 1 },
            { exactly: "-" },
            { char: "\\w", repeat: 1 }
        ]);
        expect(output).toHaveProperty("formatted", "a-b");
        expect(output).toHaveProperty("raw", "ab");
    });

    it("outputs correct structure (array)", function() {
        const output = format("AB", [
            { char: ["[ab]", "i"], repeat: 1 },
            { exactly: "-" },
            { char: ["[ab]", "i"], repeat: 1 }
        ]);
        expect(output).toHaveProperty("formatted", "A-B");
        expect(output).toHaveProperty("raw", "AB");
    });
});
